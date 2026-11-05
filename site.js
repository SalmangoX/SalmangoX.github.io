// 外观切换：跟随系统 → 浅色 → 深色（只记在本机浏览器里，读不到就跟随系统）
(function () {
  var KEY = 'sx-theme', root = document.documentElement;
  var names = { auto: '外观：跟随系统', light: '外观：浅色', dark: '外观：深色' };
  function get() { try { return localStorage.getItem(KEY) || 'auto'; } catch (e) { return 'auto'; } }
  function apply(t) {
    if (t === 'auto') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', t);
    var b = document.getElementById('themeBtn'); if (b) b.textContent = names[t];
  }
  apply(get());
  document.addEventListener('DOMContentLoaded', function () {
    apply(get());
    var b = document.getElementById('themeBtn'); if (!b) return;
    b.addEventListener('click', function () {
      var next = { auto: 'light', light: 'dark', dark: 'auto' }[get()];
      try { localStorage.setItem(KEY, next); } catch (e) {}
      apply(next);
    });
  });
})();
