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
