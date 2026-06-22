/* ============================================================
   John Spilotros · Real Estate — interactions
   - Progressive cached navigation (pages cached & kept open)
   - Scroll-aware header + mobile nav
   - Neighborhood explorer, mortgage estimator, CMA/contact forms
   No build step, no dependencies. Degrades gracefully on file://.
   ============================================================ */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PAGES = ['index.html', 'about.html', 'buyers-sellers.html', 'contact.html'];

  /* ---------------------------------------------------------
     Helpers
  --------------------------------------------------------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function fileOf(url) {
    try {
      var p = new URL(url, location.href).pathname;
      var f = p.substring(p.lastIndexOf('/') + 1);
      return f === '' ? 'index.html' : f;
    } catch (e) { return 'index.html'; }
  }
  function fmtMoney(n) {
    return '$' + Math.round(n).toLocaleString('en-US');
  }

  /* ---------------------------------------------------------
     Header scroll state
  --------------------------------------------------------- */
  function initHeader() {
    var header = $('.site-header');
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------------------------------------------------------
     Mobile nav
  --------------------------------------------------------- */
  function initMobileNav() {
    var toggle = $('.nav-toggle');
    if (!toggle || toggle.dataset.inited) return;
    toggle.dataset.inited = '1';
    toggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    $all('.mobile-nav a').forEach(function (a) {
      a.addEventListener('click', function () {
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------------------------------------------------------
     Active-nav sync
  --------------------------------------------------------- */
  function syncActiveNav(file) {
    $all('[data-route]').forEach(function (a) {
      if (a.getAttribute('data-route') === file) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }

  /* ---------------------------------------------------------
     Reveal-on-scroll (never gates visibility: content is visible
     by default; class added only when motion is safe; hard
     safety net force-reveals everything after a short delay)
  --------------------------------------------------------- */
  var revealObserver = null;
  function initReveals(root) {
    if (prefersReduced || !('IntersectionObserver' in window)) {
      $all('[data-reveal], [data-reveal-stagger]', root).forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    document.documentElement.classList.add('motion-ready');
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    }
    var els = $all('[data-reveal], [data-reveal-stagger]', root);
    els.forEach(function (el) {
      if (el.dataset.revealStagger !== undefined) {
        Array.prototype.forEach.call(el.children, function (child, i) {
          child.style.transitionDelay = Math.min(i * 70, 420) + 'ms';
        });
      }
      revealObserver.observe(el);
    });
    // safety net: anything still hidden after 2.4s reveals regardless
    setTimeout(function () {
      els.forEach(function (el) { el.classList.add('is-in'); });
    }, 2400);
  }

  /* ---------------------------------------------------------
     Neighborhood explorer
  --------------------------------------------------------- */
  function initHood(root) {
    var hood = $('[data-hood]', root);
    if (!hood || hood.dataset.inited) return;
    hood.dataset.inited = '1';
    var tabs = $all('.hood-tab', hood);
    var img = $('.hood-panel img', hood);
    var capH = $('.hood-caption h3', hood);
    var capP = $('.hood-caption p', hood);
    var panel = $('.hood-panel', hood);

    function select(tab) {
      tabs.forEach(function (t) { t.setAttribute('aria-selected', t === tab ? 'true' : 'false'); });
      var d = tab.dataset;
      capH.textContent = d.name;
      capP.textContent = d.blurb;
      img.src = d.img;
      img.alt = d.alt || d.name;
      if (!prefersReduced) {
        panel.classList.remove('hood-fade');
        void panel.offsetWidth;
        panel.classList.add('hood-fade');
      }
    }
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () { select(tab); });
      tab.addEventListener('keydown', function (e) {
        var i = tabs.indexOf(tab);
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); tabs[(i + 1) % tabs.length].focus(); tabs[(i + 1) % tabs.length].click(); }
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); tabs[(i - 1 + tabs.length) % tabs.length].focus(); tabs[(i - 1 + tabs.length) % tabs.length].click(); }
      });
    });
  }

  /* ---------------------------------------------------------
     Mortgage estimator (principal & interest only)
  --------------------------------------------------------- */
  function initMortgage(root) {
    var calc = $('[data-mortgage]', root);
    if (!calc || calc.dataset.inited) return;
    calc.dataset.inited = '1';

    var price = $('[data-m="price"]', calc);
    var down = $('[data-m="down"]', calc);
    var rate = $('[data-m="rate"]', calc);
    var term = $('[data-m="term"]', calc);
    var outPrice = $('[data-out="price"]', calc);
    var outDown = $('[data-out="down"]', calc);
    var outRate = $('[data-out="rate"]', calc);
    var outTerm = $('[data-out="term"]', calc);
    var outPay = $('[data-out="pay"]', calc);
    var outLoan = $('[data-out="loan"]', calc);
    var outDownPct = $('[data-out="downpct"]', calc);

    var STORE = 'js-mortgage';
    try {
      var saved = JSON.parse(localStorage.getItem(STORE) || 'null');
      if (saved) {
        if (saved.price) price.value = saved.price;
        if (saved.down) down.value = saved.down;
        if (saved.rate) rate.value = saved.rate;
        if (saved.term) term.value = saved.term;
      }
    } catch (e) {}

    function update() {
      var P = +price.value, D = +down.value, R = +rate.value, T = +term.value;
      var loan = Math.max(P - D, 0);
      var r = (R / 100) / 12;
      var n = T * 12;
      var monthly = r === 0 ? loan / n : loan * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
      outPrice.textContent = fmtMoney(P);
      outDown.textContent = fmtMoney(D);
      outRate.textContent = R.toFixed(2) + '%';
      outTerm.textContent = T + ' yr';
      outPay.textContent = fmtMoney(monthly || 0);
      outLoan.textContent = fmtMoney(loan);
      outDownPct.textContent = P > 0 ? Math.round((D / P) * 100) + '%' : '0%';
      try { localStorage.setItem(STORE, JSON.stringify({ price: P, down: D, rate: R, term: T })); } catch (e) {}
    }
    [price, down, rate, term].forEach(function (el) { el.addEventListener('input', update); });
    update();
  }

  /* ---------------------------------------------------------
     Toast
  --------------------------------------------------------- */
  var toastTimer;
  function toast(msg) {
    var t = $('#toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'toast'; t.className = 'toast';
      t.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg><span></span>';
      document.body.appendChild(t);
    }
    $('span', t).textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 4200);
  }

  /* ---------------------------------------------------------
     Forms (client-side validation + confirmation).
     NOTE for John: connect a form backend (Formspree, KW Command,
     etc.) by setting the form's action/method before going live —
     submissions currently show a confirmation but are not delivered
     anywhere automatically.
  --------------------------------------------------------- */
  function initForms(root) {
    $all('form[data-leadform]', root).forEach(function (form) {
      if (form.dataset.inited) return;
      form.dataset.inited = '1';

      // prefill CMA address from a hero hand-off
      var addr = $('[name="address"]', form);
      if (addr) {
        try {
          var pre = sessionStorage.getItem('cma-address');
          if (pre) { addr.value = pre; sessionStorage.removeItem('cma-address'); }
        } catch (e) {}
      }

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }
        var success = $('.form-success', form.parentNode) || $('.form-success', form);
        if (success) {
          form.style.display = 'none';
          success.classList.add('show');
          success.setAttribute('role', 'status');
        }
        toast(form.dataset.toast || 'Thanks — your message is on its way.');
        form.reset();
      });
    });
  }

  /* ---------------------------------------------------------
     Hero home-value hand-off
  --------------------------------------------------------- */
  function initHeroTool(root) {
    var tool = $('[data-hero-tool]', root);
    if (!tool || tool.dataset.inited) return;
    tool.dataset.inited = '1';
    var input = $('input', tool);
    var go = function () {
      try { if (input && input.value.trim()) sessionStorage.setItem('cma-address', input.value.trim()); } catch (e) {}
      navigate('buyers-sellers.html#home-value');
    };
    $('button', tool).addEventListener('click', go);
    if (input) input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); go(); } });
  }

  /* ---------------------------------------------------------
     Per-page init (idempotent — runs on load and after swaps)
  --------------------------------------------------------- */
  function initPage(root) {
    root = root || document;
    initReveals(root);
    initHood(root);
    initMortgage(root);
    initForms(root);
    initHeroTool(root);
  }

  /* ---------------------------------------------------------
     Cached router (progressive enhancement)
     - keeps fetched pages in memory so revisits are instant
     - View Transition crossfade when available
     - disabled on file:// (where fetch is blocked); links work natively
  --------------------------------------------------------- */
  var cache = new Map();
  var canRoute = location.protocol === 'http:' || location.protocol === 'https:';
  var main = $('#main');

  function setMain(html, title, file, hash) {
    main.innerHTML = html;
    document.title = title;
    syncActiveNav(file);
    initPage(main);
    if (hash) {
      var target = document.getElementById(hash.slice(1));
      if (target) { target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' }); return; }
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function applyDoc(entry, file, hash, push, url) {
    if (push) history.pushState({ url: url }, '', url);
    if (!prefersReduced && document.startViewTransition) {
      document.startViewTransition(function () { setMain(entry.html, entry.title, file, hash); });
    } else {
      setMain(entry.html, entry.title, file, hash);
    }
  }

  function fetchPage(url) {
    var key = fileOf(url);
    if (cache.has(key)) return Promise.resolve(cache.get(key));
    return fetch(url, { credentials: 'same-origin' })
      .then(function (r) { if (!r.ok) throw new Error('bad'); return r.text(); })
      .then(function (text) {
        var doc = new DOMParser().parseFromString(text, 'text/html');
        var m = doc.querySelector('#main');
        if (!m) throw new Error('no-main');
        var entry = { html: m.innerHTML, title: doc.title };
        cache.set(key, entry);
        return entry;
      });
  }

  function navigate(url, push) {
    if (push === undefined) push = true;
    if (!canRoute || !main) { location.href = url; return; }
    var u = new URL(url, location.href);
    var file = fileOf(u.href);
    var hash = u.hash;
    document.body.classList.remove('nav-open');
    fetchPage(u.pathname.split('/').pop() || 'index.html')
      .then(function (entry) { applyDoc(entry, file, hash, push, u.pathname + u.hash); })
      .catch(function () { location.href = url; });
  }
  window.__navigate = navigate;
  // expose for the hero tool closure above
  function navigateGlobal(url) { navigate(url); }
  window.navigate = navigateGlobal;

  function isInternal(a) {
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return false;
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#' || /^(mailto:|tel:|https?:\/\/)/.test(href) && new URL(href, location.href).origin !== location.origin) return false;
    var u;
    try { u = new URL(href, location.href); } catch (e) { return false; }
    if (u.origin !== location.origin) return false;
    return PAGES.indexOf(fileOf(u.href)) !== -1;
  }

  function initRouter() {
    if (!canRoute || !main) return;
    document.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      var a = e.target.closest('a[href]');
      if (!a || !isInternal(a)) return;
      var u = new URL(a.getAttribute('href'), location.href);
      // same page + hash → let browser handle smooth anchor scroll
      if (fileOf(u.href) === fileOf(location.href) && u.hash) return;
      e.preventDefault();
      navigate(a.getAttribute('href'));
    });
    window.addEventListener('popstate', function () {
      navigate(location.pathname + location.hash, false);
    });
    // prefetch the rest of the site while idle → pages "stay open"
    var prefetch = function () {
      PAGES.forEach(function (p) { if (p !== fileOf(location.href)) fetchPage(p).catch(function () {}); });
    };
    if ('requestIdleCallback' in window) requestIdleCallback(prefetch, { timeout: 2500 });
    else setTimeout(prefetch, 1800);
    // prefetch on hover/focus for instant feel
    document.addEventListener('mouseover', function (e) {
      var a = e.target.closest && e.target.closest('a[href]');
      if (a && isInternal(a)) fetchPage(fileOf(new URL(a.getAttribute('href'), location.href).href)).catch(function () {});
    });
  }

  /* ---------------------------------------------------------
     Boot
  --------------------------------------------------------- */
  function boot() {
    initHeader();
    initMobileNav();
    initRouter();
    initPage(document);
    syncActiveNav(fileOf(location.href));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
