const get = (data, path) => path.split('.').reduce((value, key) => value?.[key], data);
async function loadContent() {
  const status = document.querySelector('#load-status');
  try {
    const response = await fetch('./content.json', { cache: 'no-cache' });
    if (!response.ok) throw new Error('No se pudo cargar el contenido');
    const data = await response.json();
    if (!data.hero?.title || !Array.isArray(data.levels)) throw new Error('Contenido incompleto');
    document.querySelectorAll('[data-text]').forEach(element => { element.textContent = get(data, element.dataset.text) ?? ''; });
    document.querySelectorAll('[data-school]').forEach(element => { element.textContent = data.school; });
    document.querySelectorAll('[data-image]').forEach(image => {
      const item = get(data, image.dataset.image);
      if (item?.image && /^https?:\/\//.test(item.image)) image.src = item.image;
      else if (item?.image && !/^[a-z]+:/i.test(item.image)) image.src = item.image;
      image.alt = item?.alt ?? 'Imagen de muestra';
      image.addEventListener('error', () => { image.hidden = true; });
    });
    const list = document.querySelector('#levels-list');
    for (const level of data.levels) {
      const details = document.createElement('details');
      const summary = document.createElement('summary');
      for (const [className, value] of [['level-name',level.name],['level-phrase',level.phrase],['plus','+']]) {
        const span = document.createElement('span'); span.className = className; span.textContent = value;
        if (className === 'plus') span.setAttribute('aria-hidden','true'); summary.append(span);
      }
      const body = document.createElement('div'); body.className = 'level-body';
      const description = document.createElement('p'); description.textContent = level.description;
      const link = document.createElement('a'); link.className = 'text-link'; link.href = '#contacto'; link.textContent = `Solicitar informes de ${level.name}`;
      body.append(description,link); details.append(summary,body); list.append(details);
    }
    const phone = String(data.contact?.whatsapp ?? '').replace(/\D/g,'');
    if (/^\d{10,15}$/.test(phone)) {
      const link = document.querySelector('#whatsapp');
      link.href = `https://wa.me/${phone}?text=${encodeURIComponent(data.contact.message || 'Hola, me gustaría recibir informes.')}`;
      link.hidden = false; document.querySelector('#contact-status').textContent = 'Al continuar se abrirá WhatsApp. Tú decides cuándo enviar el mensaje.';
    }
  } catch (error) {
    status.hidden = false;
    status.textContent = 'No se pudo cargar el contenido. Abre la demo desde un servidor local y revisa content.json; después recarga la página.';
  }
}
const menu = document.querySelector('.menu');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open)); document.querySelector('nav').classList.toggle('open',open);
});
document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => { menu.setAttribute('aria-expanded','false'); document.querySelector('nav').classList.remove('open'); }));
document.addEventListener('keydown', event => { if(event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { menu.click(); menu.focus(); } });
loadContent();
