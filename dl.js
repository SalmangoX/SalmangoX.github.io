// 节律下载区：识别访客的设备，先推荐对应的版本；下面列出其他版本，点一下换到上面。
(function () {
  var REL = 'https://github.com/SalmangoX/month-calendar';
  var CDN = 'https://cdn.jsdelivr.net/gh/SalmangoX/month-calendar';
  var SRC = CDN + '@dist-ios/source.json';
  var ICON = {
    ios: '<rect x="6.5" y="2.5" width="11" height="19" rx="3"/><path d="M10.5 5.5h3"/>',
    mac: '<rect x="4" y="4.5" width="16" height="11" rx="2"/><path d="M2 19.5h20"/>',
    android: '<path d="M5 17V11a7 7 0 0 1 14 0v6Z"/><path d="M7 5.5 5.5 3.5M17 5.5l1.5-2"/><circle cx="9.5" cy="10" r=".7" fill="currentColor"/><circle cx="14.5" cy="10" r=".7" fill="currentColor"/>',
    web: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.6 3.8 5.7 3.8 9s-1.2 6.4-3.8 9c-2.6-2.6-3.8-5.7-3.8-9S9.4 5.6 12 3Z"/>'
  };
  var P = {
    ios: {
      name: 'iPhone', req: 'iOS 26 及以上', size: '约 1.5 MB',
      desc: '液态玻璃界面、系统提醒、桌面小组件和原生纪念相机。不上 App Store，用你自己的免费 Apple ID 签名安装，后台自动续期。',
      steps: ['装好 AltStore（需要一台 Mac）或 SideStore', '在 Sources 里添加节律的源，找到「节律」安装', '第一次在 设置 → 隐私与安全性 打开「开发者模式」'],
      main: { label: '安装说明', href: REL + '/blob/main/ios/%E5%AE%89%E8%A3%85%E8%AF%B4%E6%98%8E.md' },
      more: [{ label: '复制 AltStore 源', copy: SRC }, { label: '下载 .ipa', href: CDN + '@dist-ios/Cadence.ipa' }]
    },
    mac: {
      name: 'Mac', req: 'macOS 14 及以上', size: '约 4 MB',
      desc: '窗口里是完整的节律，关掉窗口留在菜单栏，随手看本月和今天；桌面小组件、系统通知，macOS 26 上是液态玻璃。',
      steps: ['下载 .dmg，把 Cadence 拖进「应用程序」', '有新版时菜单栏会提示，点「更新…」即可'],
      main: { label: '下载 .dmg', href: CDN + '@dist/Cadence.dmg' },
      more: [{ label: '从源码编译', href: REL + '/tree/main/macos' }]
    },
    android: {
      name: '安卓', req: '安卓 12 及以上', size: 'APK · 约 21 MB',
      desc: '原生的底部悬浮控件、桌面小组件（整月 / 今日 / 课表 / 纪念日）、系统精确闹钟提醒和后台同步，原生纪念相机。',
      steps: ['下载 APK 并打开安装', '以后在 设置 → 安卓 App 里检查更新，覆盖安装不丢数据'],
      main: { label: '下载 APK', href: REL + '/releases/latest/download/month-calendar.apk' },
      more: [{ label: '更新记录', href: REL + '/releases/latest' }]
    },
    web: {
      name: '网页版', req: '任何现代浏览器', size: '不用安装',
      desc: '打开就能用，Windows、Linux、iPad 都可以；添加到主屏幕或安装成应用后，没有网络也能打开。',
      steps: ['用浏览器打开网页版', 'Safari：分享 → 添加到主屏幕；Chrome / Edge：地址栏点「安装」', '设置 → 连接 GitHub，粘贴只勾了 gist 权限的令牌即可同步'],
      main: { label: '打开网页版', href: 'https://salmangox.github.io/month-calendar/' },
      more: []
    }
  };
  var ORDER = ['ios', 'mac', 'android', 'web'];
  var VER = '当前 1.4.2', IPAD = 'web', DEV = { ios: 'iPhone', mac: 'Mac', android: '安卓手机', web: '' };
  var C = window.SX_DL;                     // 其他页面（月账本）传进来自己的版本数据
  if (C) { P = C.platforms; ORDER = C.order; VER = C.ver; IPAD = C.ipad || 'web'; DEV = C.dev || DEV; }

  function detect() {
    var ua = navigator.userAgent || '';
    var touch = navigator.maxTouchPoints > 1;
    if (/iPhone|iPod/.test(ua)) return 'ios';
    if (/iPad/.test(ua) || (/Macintosh/.test(ua) && touch)) return IPAD;   // 节律：iPad 用网页版最合适
    if (/Android/.test(ua)) return 'android';
    if (/Macintosh|Mac OS X/.test(ua)) return 'mac';
    return 'web';
  }
  var T = window.sxT || function (x) { return x; };
  var mine = detect(), cur = mine;

  function svg(k) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICON[k] + '</svg>';
  }
  function badge(k) {
    if (k !== mine) return '<span class="dl-badge sel">' + T('你选择的版本') + '</span>';
    var dev = DEV[k];
    return '<span class="dl-badge">' + (dev ? T('为你推荐 · 你在用') + ' ' + T(dev) : T('为你推荐')) + '</span>';
  }
  function btn(b, cls) {
    if (b.copy) return '<button type="button" class="btn ' + cls + '" data-copy="' + b.copy + '">' + T(b.label) + '</button>';
    return '<a class="btn ' + cls + '" href="' + b.href + '">' + T(b.label) + '</a>';
  }
  function main(k) {
    var p = P[k];
    return '<div class="dl-glow" aria-hidden="true"></div>' +
      '<div class="dl-top"><div class="dl-tile dl-' + k + '">' + svg(k) + '</div>' +
      '<div class="dl-name">' + badge(k) + '<h3>' + T(p.name) + '</h3>' +
      '<div class="dl-meta"><span>' + T(p.req) + '</span>' + (p.size ? '<span>' + T(p.size) + '</span>' : '') + (VER ? '<span>' + T(VER) + '</span>' : '') + '</div></div></div>' +
      '<p class="dl-desc">' + T(p.desc) + '</p>' +
      '<ol class="dl-steps">' + p.steps.map(function (t, i) { return '<li><b>' + (i + 1) + '</b><span>' + T(t) + '</span></li>'; }).join('') + '</ol>' +
      '<div class="btns">' + btn(p.main, 'tint') + p.more.map(function (b) { return btn(b, 'ghost'); }).join('') +
      (k !== mine ? '<button type="button" class="dl-back" data-pick="' + mine + '">' + T('回到推荐') + '</button>' : '') + '</div>';
  }
  function list() {
    return ORDER.filter(function (k) { return k !== cur; }).map(function (k) {
      var p = P[k];
      return '<button type="button" class="dl-item" data-pick="' + k + '">' +
        '<span class="dl-tile sm dl-' + k + '">' + svg(k) + '</span>' +
        '<span class="dl-it"><b>' + T(p.name) + (k === mine ? '<i>' + T('推荐') + '</i>' : '') + '</b><small>' + T(p.req) + (p.size ? ' · ' + T(p.size) : '') + '</small></span>' +
        '<span class="dl-go" aria-hidden="true">›</span></button>';
    }).join('');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var box = document.getElementById('dlMain'), lst = document.getElementById('dlList');
    var sec = box && box.closest('section');
    if (!box || !lst) return;
    function paint(anim) {
      if (!anim) { box.innerHTML = main(cur); lst.innerHTML = list(); return; }
      box.classList.add('out');
      setTimeout(function () {
        box.innerHTML = main(cur); lst.innerHTML = list();
        box.classList.remove('out'); box.classList.add('in');
        setTimeout(function () { box.classList.remove('in'); }, 320);
      }, 140);
    }
    paint(false);
    sec.addEventListener('click', function (e) {
      var pick = e.target.closest('[data-pick]');
      if (pick) {
        cur = pick.getAttribute('data-pick');
        paint(true);
        if (pick.classList.contains('dl-item') && box.getBoundingClientRect().top < 60) box.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      var cp = e.target.closest('[data-copy]');
      if (cp) {
        var text = cp.getAttribute('data-copy'), old = cp.textContent;
        var done = function () { cp.textContent = T('已复制'); setTimeout(function () { cp.textContent = old; }, 1600); };
        if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () { prompt(T('复制这个地址：'), text); });
        else prompt(T('复制这个地址：'), text);
      }
    });
  });
})();
