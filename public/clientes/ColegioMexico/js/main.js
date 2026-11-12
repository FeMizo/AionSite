/* Colegio México — home
   - Entrada única del hero + trazo del arco "M"
   - Menú móvil accesible
   - Botón flotante de WhatsApp
   - Contenido desde content.json (si existe); el HTML ya trae el contenido por defecto */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Año ---------- */
  doc.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- Entrada del hero y arco ---------- */
  var hero = doc.querySelector('.hero');
  var arco = doc.querySelector('.arco');
  function entrar() {
    if (hero) hero.classList.add('is-in');
  }
  // El trazo del arco anima stroke-dashoffset (repinta el SVG), así que espera a que
  // termine la carga para no competir con fuentes e imágenes en el hilo principal.
  function dibujarArco() {
    if (arco) arco.classList.add('is-drawn');
  }
  if (reduce) {
    entrar();
    dibujarArco();
  } else {
    // doble rAF: asegura que el estado inicial se pintó antes de transicionar
    requestAnimationFrame(function () { requestAnimationFrame(entrar); });
    if (doc.readyState === 'complete') setTimeout(dibujarArco, 120);
    else window.addEventListener('load', function () { setTimeout(dibujarArco, 120); }, { once: true });
  }

  /* ---------- Header al hacer scroll ---------- */
  var top = doc.querySelector('[data-top]');
  if (top) {
    var onScroll = function () { top.classList.toggle('is-scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Menú móvil ---------- */
  var toggle = doc.querySelector('[data-menu-toggle]');
  var panel = doc.querySelector('[data-menu]');
  var mq = window.matchMedia('(min-width: 900px)');

  function setMenu(open) {
    if (!toggle || !panel) return;
    toggle.setAttribute('aria-expanded', String(open));
    panel.classList.toggle('is-open', open);
    var label = toggle.querySelector('span');
    var icon = toggle.querySelector('use');
    if (label) label.textContent = open ? 'Cerrar' : 'Menú';
    if (icon) icon.setAttribute('href', open ? '#i-close' : '#i-menu');
    if (open) {
      var first = panel.querySelector('a');
      if (first) first.focus();
    }
  }
  if (toggle && panel) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    panel.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        toggle.focus();
      }
    });
    // Mantener el foco dentro del menú abierto (Tab / Shift+Tab)
    panel.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab' || mq.matches) return;
      var links = panel.querySelectorAll('a');
      var last = links[links.length - 1];
      var first = links[0];
      if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); toggle.focus(); }
      if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); toggle.focus(); }
    });
    toggle.addEventListener('keydown', function (e) {
      if (e.key === 'Tab' && e.shiftKey && toggle.getAttribute('aria-expanded') === 'true' && !mq.matches) {
        var links = panel.querySelectorAll('a');
        e.preventDefault();
        links[links.length - 1].focus();
      }
    });
    mq.addEventListener('change', function () { setMenu(false); });
  }

  /* ---------- Botón flotante: visible cuando no hay otro CTA en pantalla ---------- */
  var flotante = doc.querySelector('[data-flotante]');
  var ctas = doc.querySelectorAll('[data-hero-cta], .visita [data-wa]');
  if (flotante && 'IntersectionObserver' in window) {
    var visibles = new Set();
    var arrancado = false;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) visibles.add(en.target); else visibles.delete(en.target);
      });
      arrancado = true;
      var mostrar = arrancado && visibles.size === 0;
      flotante.classList.toggle('is-visible', mostrar);
      flotante.toggleAttribute('inert', !mostrar);
      flotante.setAttribute('aria-hidden', String(!mostrar));
    });
    ctas.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Contenido desde content.json ---------- */
  function get(obj, path) {
    return path.split('.').reduce(function (acc, k) {
      return acc == null ? undefined : acc[k];
    }, obj);
  }
  function waLink(c) {
    return 'https://wa.me/' + encodeURIComponent(c.whatsapp) + '?text=' + encodeURIComponent(c.whatsappMensaje || '');
  }
  if (window.fetch && location.protocol !== 'file:') {
    fetch('content.json', { cache: 'no-cache' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        if (!data) return;
        doc.querySelectorAll('[data-cms]').forEach(function (el) {
          var v = get(data, el.getAttribute('data-cms'));
          if (typeof v === 'string' && v.trim() && el.textContent !== v) el.textContent = v;
        });
        doc.querySelectorAll('[data-cms-href]').forEach(function (el) {
          var v = get(data, el.getAttribute('data-cms-href'));
          if (typeof v === 'string' && v.trim()) el.setAttribute('href', v);
        });
        if (data.contacto && data.contacto.whatsapp) {
          var href = waLink(data.contacto);
          doc.querySelectorAll('[data-wa]').forEach(function (a) { a.setAttribute('href', href); });
        }
      })
      .catch(function () { /* se queda el contenido del HTML */ });
  }

  root.classList.add('js-ready');
})();
