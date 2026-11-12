document.documentElement.classList.add('js');
const get = (data, path) => path.split('.').reduce((value, key) => value?.[key], data);
let settings = null;
const select = document.querySelector('#stage');
const message = document.querySelector('#request-message');
const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
function closeMenu(restoreFocus = false) {
  menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('open');
  if (restoreFocus) menu.focus();
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') closeMenu(true); });
window.matchMedia('(min-width:761px)').addEventListener('change', () => closeMenu());
function updateMessage() {
  const base = settings?.visit?.message || 'Hola, me gustaría agendar una visita a Colegio Continental.';
  const text = select.value ? `${base} Me interesa ${select.value}. ¿Qué fechas tienen disponibles?` : base;
  message.textContent = text;
  const phone = String(settings?.contact?.whatsapp || '').replace(/\D/g, '');
  const link = document.querySelector('#whatsapp');
  const active = /^\d{10,15}$/.test(phone);
  link.hidden = !active;
  if (active) {
    link.href = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    document.querySelector('#contact-status').textContent = 'Se abrirá WhatsApp con este mensaje. Tú decides cuándo enviarlo.';
    document.querySelector('#visit-notice').textContent = 'La fecha de visita se confirma directamente con el colegio.';
  }
}
select.addEventListener('change', updateMessage);
document.querySelector('#reload').addEventListener('click', () => window.location.reload());
function renderLevels(levels) {
  const list = document.querySelector('#levels-list');
  list.replaceChildren();
  select.replaceChildren(new Option('Selecciona una etapa', ''));
  const tabs = document.createElement('div'); tabs.className = 'stage-tabs'; tabs.setAttribute('role','tablist'); tabs.setAttribute('aria-label','Etapas escolares');
  const panels = document.createElement('div'); panels.className = 'stage-panels';
  const controls = [];
  function activate(index, focus = false) {
    controls.forEach(({tab,panel}, current) => {
      tab.setAttribute('aria-selected', String(current === index));
      tab.tabIndex = current === index ? 0 : -1; panel.hidden = current !== index;
    });
    if (focus) controls[index].tab.focus();
  }
  levels.forEach((level,index) => {
    select.add(new Option(level.name, level.name));
    const tab = document.createElement('button'); tab.type = 'button'; tab.id = `stage-tab-${index}`; tab.textContent = level.name; tab.setAttribute('role','tab'); tab.setAttribute('aria-controls',`stage-panel-${index}`);
    const panel = document.createElement('div'); panel.className = 'stage-panel'; panel.id = `stage-panel-${index}`; panel.setAttribute('role','tabpanel'); panel.setAttribute('aria-labelledby',tab.id); panel.tabIndex = 0;
    const title = document.createElement('h3'); title.textContent = level.phrase;
    const description = document.createElement('p'); description.textContent = level.description;
    const button = document.createElement('button'); button.type = 'button'; button.className = 'stage-choice'; button.textContent = `Preparar visita para ${level.name}`;
    button.addEventListener('click', () => { select.value = level.name; updateMessage(); document.querySelector('#visita').scrollIntoView({behavior:'instant'}); select.focus({preventScroll:true}); });
    const name = document.createElement('p'); name.className = 'stage-current'; name.textContent = level.name;
    const copy = document.createElement('div'); copy.className = 'stage-panel-copy'; copy.append(title,description,button);
    panel.append(name,copy); tabs.append(tab); panels.append(panel); controls.push({tab,panel});
    tab.addEventListener('click', () => { activate(index); select.value = level.name; updateMessage(); });
    tab.addEventListener('keydown', event => {
      let next = index;
      if(event.key === 'ArrowRight') next = (index+1)%levels.length;
      else if(event.key === 'ArrowLeft') next = (index+levels.length-1)%levels.length;
      else if(event.key === 'Home') next = 0;
      else if(event.key === 'End') next = levels.length-1;
      else return;
      event.preventDefault(); activate(next,true); select.value = levels[next].name; updateMessage();
    });
  });
  list.append(tabs,panels); activate(0);
}
async function loadContent() {
  try {
    const response = await fetch('./content.json', { cache: 'no-cache' });
    if (!response.ok) throw new Error('content');
    const data = await response.json();
    if (!data.hero?.title || !Array.isArray(data.levels) || !data.levels.length) throw new Error('schema');
    settings = data;
    document.querySelectorAll('[data-text]').forEach(element => {
      const value = get(data, element.dataset.text); if (typeof value === 'string') element.textContent = value;
    });
    document.querySelectorAll('[data-school]').forEach(element => { element.textContent = data.school || 'Continental'; });
    const image = document.querySelector('[data-image]');
    if (data.hero.image && (/^https?:\/\//.test(data.hero.image) || !/^[a-z]+:/i.test(data.hero.image))) image.src = data.hero.image;
    image.alt = data.hero.alt || 'Fotografía de muestra, ajena a Continental.';
    renderLevels(data.levels); updateMessage();
  } catch {
    document.querySelector('#load-status').hidden = false;
    if (!document.querySelector('[role=tab]')) renderLevels(['Preescolar','Primaria','Secundaria','Preparatoria'].map(name => ({name, phrase:'Información pendiente de confirmar', description:'Consulta con el colegio los programas y requisitos de esta etapa.'})));
  }
}
document.querySelector('[data-image]').addEventListener('error', event => {
  event.target.hidden = true;
  event.target.closest('figure').querySelector('figcaption').textContent = 'Fotografía de muestra no disponible. Las imágenes del colegio se añadirán al confirmar los materiales.';
});
loadContent();

