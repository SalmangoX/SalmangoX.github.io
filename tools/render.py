# 把节律、月账本两页的示意图渲染成图片（img/ill/*.webp），页面里放图片，所有设备看到的一样。
# 示意图的源码在 tools/ill-cadence.html、tools/ill-ledger.html；改了源码或 style.css 里的示意图样式后，
# 每张图出 5 种语言 × 浅色 / 深色 × 各档宽度。
# 先在 tools 外起一个本地服务（python3 -m http.server 8795），再运行：python3 tools/render.py
import json, os, re, subprocess, sys, tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TOOLS = os.path.join(ROOT, 'tools')
OUT = os.path.join(ROOT, 'img', 'ill')
CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
BASE = os.environ.get('SX_BASE', 'http://localhost:8795')
H = 178                                  # 示意图的高度（CSS 像素）
# 只渲染前景（透明底），背景色块由页面画；图片按原尺寸居中摆，卡片比它宽就多露一点背景。
# 所以每一档都按这一档里卡片最窄的时候排版，保证任何窗口宽度下都不会被裁到。
#   电脑（>860）：单格 240–299、两格 515–646、整行 791–970
#   平板（560–860）：单格 228–377、两格 / 整行 491–790
#   手机（≤560）：一列 266（320 宽的屏）–506，按 300 排，再窄的两边各裁一点背景
W = {'': {'d': 232, 'p': 300}, 'w2': {'d': 491, 'p': 300}, 'w3': {'d': 791, 't': 491, 'p': 300}}
LANGS = ('s', 't', 'en', 'fr', 'ja')      # 简体 · 繁體 · English · Français · 日本語（i18n.js 里的语言代号）
MEDIA = {'p': '(max-width:560px)', 't': '(max-width:860px)'}


def blocks(html):
    """找出所有 <div class="feat bx ..."> 卡片里的 .ill 块：返回 [(卡片的大小类, ill 的起止位置)]"""
    res = []
    for m in re.finditer(r'<div class="feat bx ?([a-z0-9]*)">\s*', html):
        start = html.index('<div class="ill', m.end())
        depth, k = 0, start
        while True:
            o = html.find('<div', k); c = html.find('</div>', k)
            if o != -1 and o < c:
                depth += 1; k = o + 4
            else:
                depth -= 1; k = c + 6
                if depth == 0:
                    break
        res.append((m.group(1), start, k))
    return res


def extract(page):
    """第一次运行：把页面里画出来的示意图挪到 tools/ill-<page>.html，记下每张卡片的大小类"""
    src = os.path.join(TOOLS, f'ill-{page}.html')
    meta = os.path.join(TOOLS, f'ill-{page}.json')
    html = open(os.path.join(ROOT, f'{page}.html'), encoding='utf-8').read()
    bl = [b for b in blocks(html) if 'ill-img' not in html[b[1]:b[1] + 40]]
    if bl:
        open(src, 'w', encoding='utf-8').write('<!-- ' + page + ' 的示意图源码：tools/render.py 渲染成图片 -->\n' +
                                               '\n'.join(html[a:b] for _, a, b in bl) + '\n')
        json.dump([c for c, _, _ in bl], open(meta, 'w'))
    return json.load(open(meta))


def shoot(page, i, lang, theme, width, out, mobile=False):
    # 无界面 Chrome 的窗口至少 500 宽、高度还要扣掉一截：窗口开大，示意图按 width 排在左上角，截图后精确裁出来
    png = tempfile.mktemp(suffix='.png')
    url = f'{BASE}/tools/render.html?page={page}&i={i}&lang={lang}&theme={theme}&w={width}&m={1 if mobile else 0}'
    subprocess.run([CHROME, '--headless=new', '--hide-scrollbars', '--force-device-scale-factor=2', '--default-background-color=00000000',
                    f'--window-size={max(width, 1000)},{H + 600}', '--virtual-time-budget=2500', f'--screenshot={png}', url],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    subprocess.run(['cwebp', '-quiet', '-q', '86', '-alpha_q', '90', '-crop', '0', '0', str(width * 2), str(H * 2), png, '-o', out], check=True)
    os.remove(png)


def img_html(page, i, size):
    n = f'img/ill/{page}-{i}-s'
    def pic(theme, cls):
        src = ''.join(f'<source media="{MEDIA[k]}" srcset="{n}-{theme}-{k}.webp 2x">' for k in ('p', 't') if k in W[size])
        return (f'<picture class="{cls}">{src}<img srcset="{n}-{theme}-d.webp 2x" src="{n}-{theme}-d.webp" alt="" '
                f'loading="lazy" decoding="async"></picture>')
    return f'<div class="ill ill-img" aria-hidden="true">{pic("light", "im-l")}{pic("dark", "im-d")}</div>'


def main():
    os.makedirs(OUT, exist_ok=True)
    for page in ('cadence', 'ledger'):
        sizes = extract(page)
        for i, size in enumerate(sizes):
            for lang in LANGS:
                for theme in ('light', 'dark'):
                    for k, w in W[size].items():
                        shoot(page, i, lang, theme, w, os.path.join(OUT, f'{page}-{i}-{lang}-{theme}-{k}.webp'), mobile=k == 'p')
            print(page, i, size or '单格', '✓')
        # 页面里还是画出来的示意图，就换成图片
        p = os.path.join(ROOT, f'{page}.html')
        html = open(p, encoding='utf-8').read()
        for k, (size, a, b) in reversed(list(enumerate(blocks(html)))):
            html = html[:a] + img_html(page, k, size) + html[b:]
        open(p, 'w', encoding='utf-8').write(html)


if __name__ == '__main__':
    main()
