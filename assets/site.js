/* =============================================================
   vDanish Lab Notes · shared script
   Builds the header/footer on every page, runs the theme toggle,
   and renders the page named in <body data-page="...">.
   ============================================================= */
(function () {
  'use strict';

  var SITE = window.SITE || { topics: {} };
  var body = document.body;
  var ROOT = body.getAttribute('data-root') || '';
  var PAGE = body.getAttribute('data-page') || 'home';
  var POSTS = (window.POSTS || []).slice().sort(function (a, b) { return b.date.localeCompare(a.date) || (b.no || 0) - (a.no || 0); });
  var SERIES = SITE.series || { lab: { name: 'HOL LOG', page: 'series.html' }, study: { name: 'STUDY LOG', page: 'study-log.html' } };
  function seriesOf(p) { return p.type === 'study' ? SERIES.study : SERIES.lab; }
  function codeOf(p) { return p.code || (seriesOf(p).name + ' #' + (String(p.no).length === 1 ? '0' + p.no : p.no)); }

  /* ---------- helpers ---------- */
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function slugify(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function pad(n) { n = String(n == null ? '' : n); return n.length === 1 ? '0' + n : n; }
  function fmtDate(iso) { var d = new Date(iso + 'T00:00:00'); return isNaN(d) ? iso : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }
  function topic(t) { return SITE.topics[t] || { label: t.toUpperCase(), color: '#94a3b8', desc: '' }; }
  function postUrl(p) { return ROOT + 'posts/' + p.slug + '.html'; }
  function colorOf(p) { return topic(p.tags[0] || '').color; }
  function isNote(p) { return p.type === 'study'; }
  var LABS = POSTS.filter(function (p) { return !isNote(p); });
  var NOTES = POSTS.filter(isNote);
  var notesCount = NOTES.length;
  var done = LABS.filter(function (p) { return p.status === 'completed'; }).length;
  var target = SITE.catalogTarget || LABS.length || 1;
  var pct = Math.min(100, Math.round(done / target * 100));
  var live = LABS.filter(function (p) { return p.status === 'in-progress'; })[0];
  var allTags = [];
  LABS.forEach(function (p) { p.tags.forEach(function (t) { if (allTags.indexOf(t) < 0) allTags.push(t); }); });
  var order = Object.keys(SITE.topics);
  allTags.sort(function (a, b) { var x = order.indexOf(a), y = order.indexOf(b); return (x < 0 ? 99 : x) - (y < 0 ? 99 : y); });

  var ICON = {
    sun: '<svg class="ico i-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"/></svg>',
    moon: '<svg class="ico i-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>',
    arrow: '<svg class="ico ico-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    ext: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>',
    search: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    copy: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/></svg>',
    check: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
    star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>'
  };

  /* ---------- header + footer ---------- */
  function renderChrome() {
    var current = PAGE === 'post' ? POSTS.filter(function (x) { return x.slug === body.getAttribute('data-slug'); })[0] : null;
    var active = PAGE === 'study' ? 'series' : PAGE === 'post' ? (current && isNote(current) ? 'series' : 'home') : PAGE;
    var links = [['index.html', 'Articles', 'home'], ['series.html', 'Series', 'series'], ['about.html', 'About', 'about']];
    var h = $('#site-header');
    if (h) {
      h.className = 'site-header';
      h.innerHTML =
        '<nav class="nav" aria-label="Main">' +
          '<a class="brand" href="' + ROOT + 'index.html" aria-label="vDanish home">' +
            '<img src="' + ROOT + 'assets/logo-mark.svg" alt="" width="30" height="30">' +
            '<span class="word"><em>v</em>DANISH</span>' +
          '</a>' +
          '<div class="links">' + links.map(function (l) {
            return '<a href="' + ROOT + l[0] + '"' + (l[2] === active ? ' aria-current="page"' : '') + '>' + l[1] + '</a>';
          }).join('') + '</div>' +
          '<button class="theme-toggle" id="themeToggle" type="button">' + ICON.moon + ICON.sun + '</button>' +
        '</nav>';
    }
    var f = $('#site-footer');
    if (f) {
      f.className = 'site-footer';
      f.innerHTML =
        '<div class="wrap">' +
          '<div class="foot-grid">' +
            '<div><a class="brand" href="' + ROOT + 'index.html"><img src="' + ROOT + 'assets/logo-mark.svg" alt="" width="30" height="30"><span class="word"><em>v</em>DANISH</span></a>' +
            '<p>Lab notes on VMware Cloud Foundation, NSX and vSphere, written while working through the Broadcom Hands-on Labs one at a time.</p></div>' +
            '<div class="foot-links">' +
              '<div><b>SITE</b><a href="' + ROOT + 'index.html">Articles</a><a href="' + ROOT + 'about.html">About</a></div>' +
              '<div><b>SERIES</b><a href="' + ROOT + SERIES.lab.page + '">' + esc(SERIES.lab.name) + '</a><a href="' + ROOT + SERIES.study.page + '">' + esc(SERIES.study.name) + '</a></div>' +
              '<div><b>LINKS</b><a href="' + esc(SITE.catalogUrl) + '" target="_blank" rel="noopener noreferrer">Lab catalog ↗</a>' + (SITE.linkedin ? '<a href="' + esc(SITE.linkedin) + '" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>' : '') + '</div>' +
            '</div>' +
          '</div>' +
          '<p class="fine">© ' + new Date().getFullYear() + ' vdanish.com · Independent blog, views are my own. VMware, vSphere, NSX and VCF are trademarks of Broadcom.</p>' +
        '</div>';
    }
    // Ring gradient used by every progress ring
    var defs = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    defs.setAttribute('width', '0'); defs.setAttribute('height', '0'); defs.setAttribute('aria-hidden', 'true');
    defs.style.position = 'absolute';
    defs.innerHTML = '<defs><linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3b82f6"/><stop offset="1" stop-color="#22d3ee"/></linearGradient></defs>';
    body.appendChild(defs);
  }

  /* ---------- theme toggle (.light-theme on <body>) ---------- */
  function initTheme() {
    var btn = $('#themeToggle');
    if (!btn) return;
    function sync() {
      var light = body.classList.contains('light-theme');
      btn.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
      btn.title = light ? 'Dark mode' : 'Light mode';
      var m = $('meta[name="theme-color"]'); if (m) m.setAttribute('content', light ? '#f6f8fc' : '#070b14');
    }
    btn.addEventListener('click', function () {
      body.classList.toggle('light-theme');
      try { localStorage.setItem('vdanish-theme', body.classList.contains('light-theme') ? 'light' : 'dark'); } catch (e) {}
      sync();
    });
    sync();
  }

  /* ---------- shared pieces ---------- */
  function chips(p) {
    return '<span class="topics">' + esc(p.tags.map(function (t) { return topic(t).label; }).join(' · ')) + '</span>';
  }
  function statusHTML(p) {
    if (isNote(p)) return '<span class="status note">Study notes</span>';
    return p.status === 'completed' ? '<span class="status done">Lab completed</span>' : '<span class="status live">Lab in progress</span>';
  }
  function statusText(p) {
    if (isNote(p)) return 'Study notes';
    return p.status === 'completed' ? 'Lab completed' : 'Lab in progress';
  }
  function card(p) {
    return '<article class="lab" style="--c:' + colorOf(p) + '">' +
      '<span class="ghost" aria-hidden="true">#' + esc(pad(p.no)) + '</span>' +
      '<div class="lab-top"><span class="code">' + esc(codeOf(p)) + '</span>' + statusHTML(p) + '</div>' +
      '<h3><a href="' + postUrl(p) + '">' + esc(p.title) + '</a></h3><p class="ex">' + esc(p.excerpt) + '</p>' +
      '<div class="lab-foot">' + chips(p) + '<span class="meta">' + fmtDate(p.date) + ' · ' + p.read + ' min</span></div>' +
      '</article>';
  }
  function ring(value, label) {
    var c = 2 * Math.PI * 52;
    return '<div class="ring" role="img" aria-label="' + value + '% of the catalog completed"><svg viewBox="0 0 120 120"><circle class="track" cx="60" cy="60" r="52"/>' +
      '<circle class="val" cx="60" cy="60" r="52" stroke-dasharray="' + c.toFixed(2) + '" stroke-dashoffset="' + c.toFixed(2) + '" data-target="' + (c * (1 - Math.max(value, 1.5) / 100)).toFixed(2) + '"/></svg>' +
      '<div class="lbl"><b>' + value + '%</b><small>' + esc(label) + '</small></div></div>';
  }
  function animateRings() {
    setTimeout(function () { $$('.ring .val').forEach(function (c) { c.style.strokeDashoffset = c.getAttribute('data-target'); }); }, 150);
  }

  /* ---------- HOME ---------- */
  function home() {
    // console
    var bars = Math.round(pct / 10), bar = '';
    for (var i = 0; i < 10; i++) bar += i < bars ? '▰' : '▱';
    var latest = LABS[0];
    $('#console').innerHTML =
      '<span class="p">$</span> hol status\n' +
      '  <span class="k">labs     </span>  <span class="hi">' + done + '/' + target + '</span>  <span class="bar">' + bar + '</span> ' + pct + '%\n' +
      '  <span class="k">running  </span>  ' + (live ? '<span class="wa">' + esc(live.title) + '</span>' : '<span class="ok">idle</span>') + '\n' +
      '  <span class="k">latest   </span>  #' + esc(pad(latest ? latest.no : 0)) + ' · ' + (latest ? fmtDate(latest.date) : '–') + '\n' +
      '  <span class="k">topics   </span>  ' + allTags.map(function (t) { return esc(topic(t).label); }).join(' · ') + '\n' +
      '  <span class="k">status   </span>  <span class="ok">✔ lab pod healthy</span>\n' +
      '<span class="p">$</span> <span class="caret"></span>';
    $('#heroDay').textContent = pad(latest ? latest.no : 0);

    // topic rail + grid
    var params = new URLSearchParams(location.search);
    var state = { tag: params.get('topic') || 'all', q: '' };
    if (state.tag !== 'all' && allTags.indexOf(state.tag) < 0) state.tag = 'all';

    function rail() {
      var html = '<button class="pill" type="button" data-tag="all" aria-pressed="' + (state.tag === 'all') + '">All</button>';
      allTags.forEach(function (t) {
        html += '<button class="pill" type="button" data-tag="' + esc(t) + '" aria-pressed="' + (state.tag === t) + '">' + esc(topic(t).label) + '</button>';
      });
      $('#rail').innerHTML = html;
    }
    function grid() {
      var q = state.q.trim().toLowerCase();
      var list = LABS.filter(function (p) {
        var hay = (p.code + ' ' + p.title + ' ' + p.excerpt + ' ' + p.tags.join(' ')).toLowerCase();
        return (state.tag === 'all' || p.tags.indexOf(state.tag) > -1) && (!q || q.split(/\s+/).every(function (w) { return hay.indexOf(w) > -1; }));
      });
      $('#grid').innerHTML = list.map(card).join('');
      $('#grid').hidden = !list.length;
      $('#empty').hidden = !!list.length;
      $('#labCount').textContent = list.length + ' of ' + LABS.length;
    }
    $('#rail').addEventListener('click', function (e) {
      var b = e.target.closest('[data-tag]'); if (!b) return;
      state.tag = b.getAttribute('data-tag');
      try { history.replaceState(null, '', state.tag === 'all' ? location.pathname + '#labs' : '?topic=' + state.tag + '#labs'); } catch (err) {}
      rail(); grid();
    });
    var timer;
    $('#search').addEventListener('input', function (e) {
      clearTimeout(timer); var v = e.target.value;
      timer = setTimeout(function () { state.q = v; grid(); }, 120);
    });
    $('#resetFilter').addEventListener('click', function () { state.tag = 'all'; state.q = ''; $('#search').value = ''; rail(); grid(); });
    rail(); grid();

    // series bands
    $('#seriesRing').innerHTML = ring(pct, done + '/' + target);
    $('#seriesText').textContent = done + ' Hands-on Labs completed so far, one write-up per lab.';
    var sr = $('#studyRing');
    if (sr) {
      sr.innerHTML = countBadge(notesCount, 'entries');
      $('#studyText').textContent = notesCount + ' entries of notes and lessons from training days, workshops and review sessions.';
    }

    // author strip
    $('#authorStrip').innerHTML = '<span class="hexav" aria-hidden="true">' + esc(SITE.initials) + '</span>' +
      '<div><b>Written by ' + esc(SITE.author) + '</b><small>CCIE at 20 · 3× VCAP · 4× VCP · VMware Cloud Foundation &amp; NSX</small></div>' +
      '<a href="' + ROOT + 'about.html">About me ' + ICON.arrow + '</a>';
    animateRings();
  }

  /* ---------- SERIES TIMELINES ---------- */
  function countBadge(n, label) {
    return '<div class="ring count-badge"><div class="lbl"><b>' + n + '</b><small>' + esc(label) + '</small></div></div>';
  }
  function seriesTabs(active) {
    var el = $('#seriesTabs'); if (!el) return;
    var tabs = [['lab', LABS.length], ['study', NOTES.length]];
    el.innerHTML = tabs.map(function (t) {
      var s = SERIES[t[0]];
      return '<a href="' + ROOT + s.page + '"' + (t[0] === active ? ' aria-current="page"' : '') + '>' + esc(s.name) + '<small>' + t[1] + '</small></a>';
    }).join('');
  }
  function timeline(list, nextText) {
    // Newest first, so a new entry always lands at the top
    var desc = list.slice().sort(function (a, b) { return (b.no || 0) - (a.no || 0) || b.date.localeCompare(a.date); });
    $('#timeline').innerHTML =
      '<li class="tl-item soon"><span class="tl-node">…</span><div class="tl-card"><h3>Next entry</h3><p>' + esc(nextText) + '</p></div></li>' +
      desc.map(function (p) {
      return '<li class="tl-item ' + (isNote(p) ? 'note' : p.status === 'completed' ? 'done' : 'live') + '"><span class="tl-node">' + esc(pad(p.no)) + '</span>' +
        '<a class="tl-card" style="--c:' + colorOf(p) + '" href="' + postUrl(p) + '">' +
          '<div class="lab-top"><span class="code">' + esc(codeOf(p)) + '</span>' + statusHTML(p) + '</div>' +
          '<h3>' + esc(p.title) + '</h3><p>' + esc(p.excerpt) + '</p>' +
          '<div class="lab-foot">' + chips(p) +
          '<span class="meta">' + esc(p.dateLabel || fmtDate(p.date)) + ' · ' + p.read + ' min</span></div></a></li>';
    }).join('');
  }
  function series() {
    $('#seriesHeadRing').innerHTML = ring(pct, 'catalog');
    $('#stDone').textContent = done;
    $('#stTarget').textContent = target;
    seriesTabs('lab');
    timeline(LABS, 'The next Hands-on Lab lands here.');
    animateRings();
  }
  function study() {
    $('#studyHeadBadge').innerHTML = countBadge(notesCount, 'entries');
    var first = NOTES[NOTES.length - 1], last = NOTES[0];
    $('#stFirst').textContent = first ? fmtDate(first.date) : '–';
    $('#stLast').textContent = last ? fmtDate(last.date) : '–';
    seriesTabs('study');
    timeline(NOTES, 'The next study entry lands here.');
  }

  /* ---------- POST ---------- */
  function highlight(code) {
    var safe = code.textContent.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    var re = /(^\s*#.*$)|("(?:[^"\\\n]|\\.)*"|'[^'\n]*')|(\$[A-Za-z_][\w:]*|\$_)|(\b[A-Z][a-z]+-[A-Z][A-Za-z]+\b|\b(?:curl|kubectl|jq|get)\b)|((?:^|\s)-{1,2}[A-Za-z][\w-]*)/gm;
    code.innerHTML = safe.replace(re, function (m, c, s, v, k, f) {
      if (c) return '<span class="t-c">' + c + '</span>';
      if (s) return '<span class="t-s">' + s + '</span>';
      if (v) return '<span class="t-v">' + v + '</span>';
      if (k) return '<span class="t-k">' + k + '</span>';
      if (f) { var lead = f.match(/^\s*/)[0]; return lead + '<span class="t-f">' + f.slice(lead.length) + '</span>'; }
      return m;
    });
  }
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (res) {
      var ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (e) {} ta.remove(); res();
    });
  }
  function enhance(root) {
    $$('pre', root).forEach(function (pre) {
      var code = $('code', pre) || pre, raw = code.textContent;
      highlight(code);
      var box = document.createElement('div'); box.className = 'codeblock';
      box.innerHTML = '<div class="codehead"><span>' + esc(pre.getAttribute('data-lang') || 'code') + '</span><button class="copy" type="button">' + ICON.copy + 'Copy</button></div>';
      pre.parentNode.insertBefore(box, pre); box.appendChild(pre);
      var b = $('.copy', box);
      b.addEventListener('click', function () {
        copyText(raw).then(function () {
          b.classList.add('ok'); b.innerHTML = ICON.check + 'Copied';
          setTimeout(function () { b.classList.remove('ok'); b.innerHTML = ICON.copy + 'Copy'; }, 1500);
        });
      });
    });
    $$('table', root).forEach(function (t) {
      if (t.parentNode.classList.contains('table')) return;
      var w = document.createElement('div'); w.className = 'table'; t.parentNode.insertBefore(w, t); w.appendChild(t);
    });
  }

  /* ---------- full-screen photo viewer ---------- */
  function lightbox(root) {
    var imgs = $$('img', root).filter(function (im) { return !im.closest('a'); });
    if (!imgs.length) return;
    var box = document.createElement('div');
    box.className = 'lightbox';
    box.hidden = true;
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Photo viewer');
    box.innerHTML =
      '<div class="lb-bar"><span class="lb-count"></span>' +
        '<button class="lb-btn lb-fs" type="button" aria-label="Toggle full screen" title="Full screen (F)"><svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg></button>' +
        '<button class="lb-btn lb-close" type="button" aria-label="Close" title="Close (Esc)"><svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>' +
      '<button class="lb-nav lb-prev" type="button" aria-label="Previous photo"><svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>' +
      '<figure class="lb-fig"><img alt=""><figcaption></figcaption></figure>' +
      '<button class="lb-nav lb-next" type="button" aria-label="Next photo"><svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>';
    body.appendChild(box);
    var big = $('.lb-fig img', box), cap = $('.lb-fig figcaption', box), count = $('.lb-count', box);
    var idx = 0, lastFocus = null;

    function show(i) {
      idx = (i + imgs.length) % imgs.length;
      var im = imgs[idx], fc = im.closest('figure') && $('figcaption', im.closest('figure'));
      big.src = im.currentSrc || im.src;
      big.alt = im.alt;
      var label = fc && $('.shot-no', fc);
      cap.textContent = !fc ? im.alt
        : label ? label.textContent + ' · ' + fc.textContent.slice(label.textContent.length).trim()
        : fc.textContent;
      count.textContent = (idx + 1) + ' / ' + imgs.length;
    }
    function open(i) {
      lastFocus = document.activeElement;
      show(i);
      box.hidden = false;
      body.classList.add('lb-open');
      void box.offsetWidth;            // start the fade from the hidden state
      box.classList.add('is-open');
      $('.lb-close', box).focus();
    }
    function close() {
      if (document.fullscreenElement) { try { document.exitFullscreen(); } catch (e) {} }
      box.classList.remove('is-open');
      body.classList.remove('lb-open');
      setTimeout(function () { box.hidden = true; big.removeAttribute('src'); }, 200);
      if (lastFocus) lastFocus.focus();
    }
    function toggleFs() {
      try {
        if (document.fullscreenElement) document.exitFullscreen();
        else if (box.requestFullscreen) box.requestFullscreen();
      } catch (e) {}
    }

    imgs.forEach(function (im, i) {
      im.classList.add('zoomable');
      im.tabIndex = 0;
      im.setAttribute('role', 'button');
      im.setAttribute('aria-label', 'View full screen: ' + (im.alt || 'photo'));
      im.addEventListener('click', function () { open(i); });
      im.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); } });
    });
    $('.lb-close', box).addEventListener('click', close);
    $('.lb-fs', box).addEventListener('click', toggleFs);
    $('.lb-prev', box).addEventListener('click', function () { show(idx - 1); });
    $('.lb-next', box).addEventListener('click', function () { show(idx + 1); });
    box.addEventListener('click', function (e) { if (e.target === box || e.target.classList.contains('lb-fig')) close(); });
    document.addEventListener('keydown', function (e) {
      if (box.hidden) return;
      if (e.key === 'Escape' && !document.fullscreenElement) close();
      else if (e.key === 'ArrowLeft') show(idx - 1);
      else if (e.key === 'ArrowRight') show(idx + 1);
      else if (e.key === 'f' || e.key === 'F') toggleFs();
      else if (e.key === 'Tab') {
        var f = $$('button', box), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    var sx = null;
    box.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx; sx = null;
      if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
    });
  }

  function post() {
    var slug = body.getAttribute('data-slug');
    var p = POSTS.filter(function (x) { return x.slug === slug; })[0];
    if (!p) { $('#postHead').innerHTML = '<div class="wrap"><p>This article is missing from assets/posts.js.</p></div>'; return; }

    var SAME = isNote(p) ? NOTES : LABS;
    $('#postHead').innerHTML =
      '<div class="wrap">' +
        (isNote(p) ? '<a class="back" href="' + ROOT + SERIES.study.page + '">← all ' + esc(SERIES.study.name.toLowerCase()) + ' entries</a>'
                   : '<a class="back" href="' + ROOT + 'index.html#labs">← all lab notes</a>') +
        '<div class="post-tags" style="--c:' + colorOf(p) + '"><span class="code">' + esc(codeOf(p)) + '</span>' + statusHTML(p) + chips(p) + '</div>' +
        '<h1>' + esc(p.title) + '</h1>' +
        '<p class="lead">' + esc(p.excerpt) + '</p>' +
        '<div class="byline"><span class="hexav" aria-hidden="true">' + esc(SITE.initials) + '</span>' +
          '<a href="' + ROOT + 'about.html">' + esc(SITE.author) + '</a>' +
          '<span>' + esc(p.dateLabel || fmtDate(p.date)) + '</span><span>' + p.read + ' min read</span><span>' + esc(seriesOf(p).name) + ' · #' + esc(pad(p.no)) + '</span></div>' +
      '</div>';

    var b = $('#postBody');
    enhance(b);
    lightbox(b);
    var heads = $$('h2', b), used = {};
    heads.forEach(function (h) { var id = slugify(h.textContent) || 'section'; while (used[id]) id += '-2'; used[id] = 1; h.id = id; });

    $('#postSide').innerHTML =
      '<div class="sheet"><h2>' + (isNote(p) ? 'STUDY SHEET' : 'LAB SHEET') + '</h2><dl>' +
        (p.code ? '<div><dt>Code</dt><dd>' + esc(p.code) + '</dd></div>' : '') +
        '<div><dt>Series</dt><dd>' + esc(seriesOf(p).name) + '</dd></div>' +
        '<div><dt>Entry</dt><dd>#' + esc(pad(p.no)) + '</dd></div>' +
        '<div><dt>Date</dt><dd>' + esc(p.dateLabel || fmtDate(p.date)) + '</dd></div>' +
        '<div><dt>Topics</dt><dd>' + esc(p.tags.map(function (t) { return topic(t).label; }).join(', ')) + '</dd></div>' +
        '<div><dt>Read</dt><dd>' + p.read + ' min</dd></div>' +
      '</dl></div>' +
      (heads.length > 1 ? '<div class="sheet toc"><h2>ON THIS PAGE</h2><ol>' + heads.map(function (h) { return '<li><a href="#' + h.id + '">' + esc(h.textContent) + '</a></li>'; }).join('') + '</ol></div>' : '') +
      (isNote(p) ? '' : '<a class="btn side-btn" href="' + esc(SITE.catalogUrl) + '" target="_blank" rel="noopener noreferrer">Run this lab ' + ICON.ext + '</a>');

    if ('IntersectionObserver' in window && heads.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) $$('.toc a').forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + en.target.id); });
        });
      }, { rootMargin: '-100px 0px -70% 0px' });
      heads.forEach(function (h) { io.observe(h); });
    }

    var i = SAME.indexOf(p), older = SAME[i + 1], newer = SAME[i - 1];
    $('#postNav').innerHTML =
      (older ? '<a href="' + postUrl(older) + '"><small>← previous entry</small>' + esc(older.title) + '</a>' : '<span class="blank"></span>') +
      (newer ? '<a class="next" href="' + postUrl(newer) + '"><small>next entry →</small>' + esc(newer.title) + '</a>' : '<span class="blank"></span>');

    var rel = SAME.filter(function (q) { return q !== p && q.tags.some(function (t) { return p.tags.indexOf(t) > -1; }); });
    SAME.forEach(function (q) { if (q !== p && rel.indexOf(q) < 0) rel.push(q); });
    $('#related').innerHTML = rel.slice(0, 3).map(card).join('');

    var bar = $('#readProgress');
    function onScroll() {
      var r = b.getBoundingClientRect(), total = r.height - window.innerHeight * 0.6;
      bar.style.width = Math.max(0, Math.min(100, (-r.top + 100) / Math.max(total, 1) * 100)) + '%';
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- boot ---------- */
  renderChrome();
  initTheme();
  if (PAGE === 'home') home();
  else if (PAGE === 'series') series();
  else if (PAGE === 'study') study();
  else if (PAGE === 'post') post();
})();
