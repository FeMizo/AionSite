(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Año
  $$('[data-year]').forEach(function (n) { n.textContent = new Date().getFullYear(); });

  // Encabezado: borde sutil al desplazarse
  var top = $('[data-top]');
  function onScroll() { top.classList.toggle('is-stuck', window.scrollY > 8); }
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  // Menú móvil
  var toggle = $('[data-menu-toggle]'), menu = $('[data-menu]');
  function closeMenu() { menu.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); }
  toggle.addEventListener('click', function () {
    var open = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeMenu(); toggle.focus(); } });
  document.addEventListener('click', function (e) { if (!e.target.closest('.nav')) closeMenu(); });
  $$('a', menu).forEach(function (a) { a.addEventListener('click', closeMenu); });

  // Revelado
  var rev = $$('[data-reveal]');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    rev.forEach(function (n) { io.observe(n); });
  } else { rev.forEach(function (n) { n.classList.add('is-in'); }); }

  // Botón flotante: aparece cuando el CTA de la portada sale de pantalla
  var fl = $('[data-flotante]'), hero = $('[data-hero-cta]'), visita = $('#visita');
  var heroVis = true, visitaVis = false;
  function setFl() {
    var on = !heroVis && !visitaVis;
    fl.classList.toggle('is-on', on);
    if (on) { fl.removeAttribute('inert'); fl.removeAttribute('aria-hidden'); }
    else { fl.setAttribute('inert', ''); fl.setAttribute('aria-hidden', 'true'); }
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { heroVis = es[0].isIntersecting; setFl(); }).observe(hero);
    new IntersectionObserver(function (es) { visitaVis = es[0].isIntersecting; setFl(); }, { threshold: 0.2 }).observe(visita);
  }

  // Tira de niveles: botones, contador, arrastre con ratón e inercia proyectada
  var tira = $('[data-tira]'), prev = $('[data-tira-prev]'), next = $('[data-tira-next]'), cuenta = $('[data-cuenta]');
  var items = $$('.nivel', tira);
  function paso() { return items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : tira.clientWidth; }
  function indice() { return Math.max(0, Math.min(items.length - 1, Math.round(tira.scrollLeft / paso()))); }
  function estado() {
    var i = indice();
    cuenta.textContent = (i + 1) + ' de ' + items.length;
    prev.disabled = i === 0; next.disabled = i === items.length - 1;
  }
  function ir(i) {
    i = Math.max(0, Math.min(items.length - 1, i));
    tira.scrollTo({ left: items[i].offsetLeft - items[0].offsetLeft, behavior: reduce ? 'auto' : 'smooth' });
  }
  prev.addEventListener('click', function () { ir(indice() - 1); });
  next.addEventListener('click', function () { ir(indice() + 1); });
  tira.addEventListener('scroll', function () { window.requestAnimationFrame(estado); }, { passive: true });
  tira.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); ir(indice() + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); ir(indice() - 1); }
  });

  // Proyección de inercia (función de desaceleración de Apple)
  function proyecta(v, d) { d = d || 0.998; return (v / 1000) * d / (1 - d); }
  var drag = null;
  tira.addEventListener('pointerdown', function (e) {
    if (e.pointerType !== 'mouse' || e.button !== 0 || e.target.closest('a,button')) return;
    drag = { x: e.clientX, left: tira.scrollLeft, hist: [{ x: e.clientX, t: e.timeStamp }], moved: false };
    tira.setPointerCapture(e.pointerId);
  });
  tira.addEventListener('pointermove', function (e) {
    if (!drag) return;
    var dx = e.clientX - drag.x;
    if (!drag.moved && Math.abs(dx) < 8) return;   // histéresis
    drag.moved = true; tira.classList.add('is-arrastre');
    tira.scrollLeft = drag.left - dx;               // 1:1 con el puntero
    drag.hist.push({ x: e.clientX, t: e.timeStamp });
    if (drag.hist.length > 6) drag.hist.shift();
  });
  function suelta(e) {
    if (!drag) return;
    var h = drag.hist, a = h[0], b = h[h.length - 1];
    var v = b.t > a.t ? (b.x - a.x) / (b.t - a.t) * 1000 : 0;  // px/s del puntero
    var moved = drag.moved; drag = null;
    tira.classList.remove('is-arrastre');
    if (!moved) return;
    var destino = tira.scrollLeft - proyecta(v);              // hacia dónde iba el gesto
    ir(Math.round(destino / paso()));
  }
  tira.addEventListener('pointerup', suelta);
  tira.addEventListener('pointercancel', suelta);
  estado();

  // Tarjeta de visita: el mensaje responde al instante
  var sel = $('[data-nivel]'), msg = $('[data-mensaje]'), btn = $('[data-enviar]');
  function actualiza() {
    var n = sel.value;
    var t = 'Hola, me gustaría agendar una visita al Colegio México' + (n ? ' para el nivel de ' + n : '') + '.';
    msg.textContent = t;
    btn.href = 'https://wa.me/529383820874?text=' + encodeURIComponent(t);
    msg.classList.add('is-cambio');
    window.requestAnimationFrame(function () { window.requestAnimationFrame(function () { msg.classList.remove('is-cambio'); }); });
  }
  sel.addEventListener('change', actualiza);
})();
