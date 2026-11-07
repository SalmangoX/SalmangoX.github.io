// 外观切换：跟随系统 → 浅色 → 深色（只记在本机浏览器里，读不到就跟随系统）
(function () {
  var KEY = 'sx-theme', root = document.documentElement;
  root.classList.add('js');
  var names = { auto: '外观：跟随系统', light: '外观：浅色', dark: '外观：深色' };
  function get() { try { return localStorage.getItem(KEY) || 'auto'; } catch (e) { return 'auto'; } }
  function apply(t) {
    if (t === 'auto') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', t);
    var b = document.getElementById('themeBtn'); if (b) b.textContent = names[t];
  }
  apply(get());

  document.addEventListener('DOMContentLoaded', function () {
    apply(get());
    var b = document.getElementById('themeBtn');
    if (b) b.addEventListener('click', function () {
      var next = { auto: 'light', light: 'dark', dark: 'auto' }[get()];
      try { localStorage.setItem(KEY, next); } catch (e) {}
      apply(next);
    });

    // 顶栏：滚下去才显示毛玻璃
    function onScroll() { root.classList.toggle('scrolled', scrollY > 8); }
    onScroll(); addEventListener('scroll', onScroll, { passive: true });

    // 滚动渐显：同一组里的元素依次出现
    var sel = '.reveal, .sec-h, .feat, .plat, .pri, .formula, main table';
    var els = [].slice.call(document.querySelectorAll(sel));
    els.forEach(function (el) {
      el.classList.add('reveal');
      var sib = el.parentElement ? [].slice.call(el.parentElement.children).filter(function (c) { return c.matches(sel); }) : [];
      var i = sib.indexOf(el);
      if (i > 0) el.style.setProperty('--d', Math.min(i, 6) * 0.07 + 's');
    });
    function show(el) {
      el.classList.add('in');
      // 动画结束后去掉 reveal，悬停效果才能正常生效（in 留着给示意图用）
      setTimeout(function () { el.classList.remove('reveal'); el.style.removeProperty('--d'); }, 1500);
    }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        // 进入视野的出现；直接跳到下面时，已经在视野上方的也一起显示
        es.forEach(function (e) { if (e.isIntersecting || e.boundingClientRect.bottom < 0) { show(e.target); io.unobserve(e.target); } });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
      els.forEach(function (el) { io.observe(el); });
    } else els.forEach(show);

    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 产品卡片：点按漾光 + 微微下沉
    [].forEach.call(document.querySelectorAll('.show'), function (card) {
      var up = function () { card.classList.remove('pressed'); };
      card.addEventListener('pointerdown', function (e) {
        if (reduce || e.target.closest('.badge')) return;     // 按在效果图上是要拖卡片，不触发卡片的点按效果
        var r = card.getBoundingClientRect();
        var dot = document.createElement('span');
        dot.className = 'ripple';
        dot.style.left = (e.clientX - r.left) + 'px';
        dot.style.top = (e.clientY - r.top) + 'px';
        card.appendChild(dot);
        setTimeout(function () { dot.remove(); }, 950);
        card.classList.add('pressed');
      });
      ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (t) { card.addEventListener(t, up); });
    });

    // 徽章卡片：按住拖动时跟着倾斜，鼠标悬停时轻轻跟随，松手回弹
    if (!reduce) [].forEach.call(document.querySelectorAll('.cal, .lg-app'), function (el) {
      el.classList.add('badge');
      var drag = false, sx = 0, sy = 0;
      var clamp = function (v, m) { return Math.max(-m, Math.min(m, v)); };
      var set = function (rx, ry, tx, ty, s, gx, gy, go) {
        el.style.setProperty('--drx', rx + 'deg'); el.style.setProperty('--dry', ry + 'deg');
        el.style.setProperty('--dtx', tx + 'px'); el.style.setProperty('--dty', ty + 'px');
        el.style.setProperty('--ds', s);
        el.style.setProperty('--gx', gx + '%'); el.style.setProperty('--gy', gy + '%'); el.style.setProperty('--go', go);
      };
      var reset = function () {
        drag = false;
        el.classList.remove('dragging', 'hovering');
        el.classList.add('release');
        set(0, 0, 0, 0, 1, 30, 0, 0);
      };
      el.addEventListener('pointerdown', function (e) {
        if (e.button > 0) return;
        drag = true; sx = e.clientX; sy = e.clientY;
        try { el.setPointerCapture(e.pointerId); } catch (_) {}
        el.classList.remove('release', 'hovering');
        el.classList.add('dragging');
      });
      el.addEventListener('pointermove', function (e) {
        if (drag) {
          var dx = e.clientX - sx, dy = e.clientY - sy;
          set(clamp(-dy * 0.14, 16), clamp(dx * 0.14, 18), clamp(dx * 0.08, 14), clamp(dy * 0.08, 12), 1.03,
              50 + clamp(dx * 0.35, 45), 15 + clamp(dy * 0.35, 40), 0.9);
        } else if (e.pointerType === 'mouse') {
          var r = el.getBoundingClientRect();
          var px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
          el.classList.remove('release');
          el.classList.add('hovering');
          set(-py * 9, px * 11, 0, 0, 1.015, 50 + px * 80, 10 + py * 70, 0.6);
        }
      });
      ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(function (t) { el.addEventListener(t, function () { if (drag) reset(); }); });
      el.addEventListener('pointerleave', function (e) { if (!drag && e.pointerType === 'mouse') reset(); });
    });

    // 自动检查更新：打开页面、从后台切回来时，跳过缓存取一次最新页面，比对 <meta name="sx-build">。
    // 刚打开还没开始浏览：直接刷新；已经在看了：底部弹一个小提示，点一下再刷新。
    var meta = document.querySelector('meta[name="sx-build"]');
    var opened = Date.now(), busy = false;
    function toast() {
      if (document.getElementById('sxUpdate')) return;
      var b = document.createElement('button');
      b.id = 'sxUpdate'; b.type = 'button'; b.className = 'update-toast';
      b.textContent = '网站已更新 · 点此刷新';
      b.addEventListener('click', function () { location.reload(); });
      document.body.appendChild(b);
      requestAnimationFrame(function () { b.classList.add('show'); });
    }
    window.sxCheckUpdate = function () {
      if (!meta || busy || !window.fetch) return;
      busy = true;
      fetch(location.pathname, { cache: 'reload' })          // 走网络并顺便更新浏览器缓存，之后刷新拿到的就是新页面
        .then(function (r) { return r.ok ? r.text() : ''; })
        .then(function (html) {
          var m = html.match(/<meta name="sx-build" content="(\d+)">/);
          if (!m || m[1] === meta.content) return;
          if (Date.now() - opened < 8000 && scrollY < 80) location.reload();
          else toast();
        })
        .catch(function () {})
        .then(function () { busy = false; });
    };
    setTimeout(window.sxCheckUpdate, 600);
    document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'visible') window.sxCheckUpdate(); });

    // 「联系」：不直接交给系统的邮件程序（有的设备会被默认打开网易等邮箱网站），
    // 先把邮箱复制好，底部提示里再给一个「用邮件 App 写信」
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="mailto:"]');
      if (!a || e.target.closest('.mail-toast')) return;
      e.preventDefault();
      var mail = a.getAttribute('href').slice(7);
      var old = document.getElementById('sxMail'); if (old) old.remove();
      var t = document.createElement('div');
      t.id = 'sxMail'; t.className = 'mail-toast'; t.setAttribute('role', 'status');
      t.innerHTML = '<span>邮箱已复制：<b></b></span><a href="mailto:' + mail + '">用邮件 App 写信</a>';
      t.querySelector('b').textContent = mail;
      document.body.appendChild(t);
      requestAnimationFrame(function () { t.classList.add('show'); });
      var copied = function () {}, fail = function () { t.querySelector('span').firstChild.textContent = '联系邮箱：'; };
      if (navigator.clipboard) navigator.clipboard.writeText(mail).then(copied, fail); else fail();
      clearTimeout(window.__sxMailT);
      window.__sxMailT = setTimeout(function () { t.classList.remove('show'); setTimeout(function () { t.remove(); }, 400); }, 6000);
    });

    // 跟随鼠标的光晕
    [].forEach.call(document.querySelectorAll('.spot'), function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  });
})();
