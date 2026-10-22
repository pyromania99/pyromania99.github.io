// Progressive enhancement only: the page reads fully without JavaScript.

// Theme toggle (remembers the choice when storage is available)
(function () {
  var root = document.documentElement;
  var btn = document.getElementById('theme');
  try {
    var saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
  } catch (e) {}
  btn.addEventListener('click', function () {
    var current = root.getAttribute('data-theme') ||
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
})();

// Evidence ledger filter
(function () {
  var buttons = document.querySelectorAll('.filters button');
  var rows = document.querySelectorAll('#ledger tbody tr');
  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.getAttribute('data-f');
      buttons.forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
      rows.forEach(function (r) {
        var levels = (r.getAttribute('data-l') || '').split(' ');
        r.hidden = f !== 'all' && levels.indexOf(f) === -1;
      });
    });
  });
})();
