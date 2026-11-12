/* Colegio México · home 2.0
   - Menú móvil accesible
   - Botón flotante de WhatsApp
   - Revelado al entrar (una vez) y escenas de logros que se apilan
   - Contacto desde content.json (si existe) */
(function () {
  'use strict';

  var doc = document;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  doc.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

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
    if (open) { var first = panel.querySelector('a'); if (first) first.focus(); }
  }
  if (toggle && panel) {
    toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });
    panel.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setMenu(false); toggle.focus(); }
    });
    panel.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab' || mq.matches) return;
      var links = panel.querySelectorAll('a');
      var last = links[links.length - 1], first = links[0];
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
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) visibles.add(en.target); else visibles.delete(en.target); });
      var mostrar = visibles.size === 0;
      flotante.classList.toggle('is-visible', mostrar);
      flotante.toggleAttribute('inert', !mostrar);
      flotante.setAttribute('aria-hidden', String(!mostrar));
    });
    ctas.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Revelado al entrar: una sola vez ---------- */
  var reveals = doc.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); ro.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    reveals.forEach(function (el) { ro.observe(el); });
  }

  /* ---------- Tira de logros: botones con la inercia nativa del scroll ---------- */
  var tira = doc.querySelector('[data-tira]');
  var prev = doc.querySelector('[data-tira-prev]');
  var next = doc.querySelector('[data-tira-next]');
  function pasoTira() { return tira ? tira.clientWidth : 320; }
  function estadoTira() {
    if (!tira || !prev || !next) return;
    prev.disabled = tira.scrollLeft < 8;
    var puntos = doc.querySelectorAll('.puntitos i');
    var idx = Math.round(tira.scrollLeft / Math.max(1, tira.clientWidth));
    puntos.forEach(function (p, i) { p.classList.toggle('is-on', i === idx); });
    var cuenta = doc.querySelector('[data-cuenta]');
    if (cuenta) cuenta.textContent = (idx + 1) + ' de ' + puntos.length;
    next.disabled = tira.scrollLeft + tira.clientWidth >= tira.scrollWidth - 8;
  }
  if (tira && prev && next) {
    prev.addEventListener('click', function () { tira.scrollBy({ left: -pasoTira(), behavior: reduce ? 'auto' : 'smooth' }); });
    next.addEventListener('click', function () { tira.scrollBy({ left: pasoTira(), behavior: reduce ? 'auto' : 'smooth' }); });
    tira.addEventListener('scroll', function () { requestAnimationFrame(estadoTira); }, { passive: true });
    tira.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); next.click(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev.click(); }
    });
    window.addEventListener('resize', estadoTira);
    estadoTira();
  }

  /* ---------- Contacto desde content.json ---------- */
  function get(obj, path) { return path.split('.').reduce(function (acc, k) { return acc == null ? undefined : acc[k]; }, obj); }
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
          var href = 'https://wa.me/' + encodeURIComponent(data.contacto.whatsapp) + '?text=' + encodeURIComponent(data.contacto.whatsappMensaje || '');
          doc.querySelectorAll('[data-wa]').forEach(function (a) { a.setAttribute('href', href); });
        }
      })
      .catch(function () {});
  }
})();
