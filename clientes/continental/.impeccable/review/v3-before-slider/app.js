document.documentElement.classList.add('js');
const get = (object,path) => path.split('.').reduce((value,key)=>value?.[key],object);
const menu = document.querySelector('.menu');
const nav = document.querySelector('#navigation');
const stageSelect = document.querySelector('#stage');
let content = null;
function closeMenu(focus=false){menu.setAttribute('aria-expanded','false');nav.classList.remove('open');if(focus)menu.focus();}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>closeMenu()));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.getAttribute('aria-expanded')==='true')closeMenu(true);});
window.matchMedia('(min-width:761px)').addEventListener('change',()=>closeMenu());
function updateMessage(){
 const base=content?.visit?.message||'Hola, me gustaría agendar una visita a Colegio Continental 2000.';
 const text=stageSelect.value?`${base} Me interesa ${stageSelect.value}. ¿Qué fechas tienen disponibles?`:base;
 document.querySelector('#request-message').textContent=text;
 const phone=String(content?.contact?.whatsapp||'').replace(/\D/g,'');
 const whatsapp=document.querySelector('#whatsapp');const enabled=/^\d{10,15}$/.test(phone);whatsapp.hidden=!enabled;
 if(enabled){whatsapp.href=`https://wa.me/${phone}?text=${encodeURIComponent(text)}`;document.querySelector('#contact-status').textContent='Se abrirá WhatsApp con este mensaje. Tú decides cuándo enviarlo.';document.querySelector('#visit-notice').textContent='La fecha de visita se confirma directamente con el colegio.';}
}
stageSelect.addEventListener('change',updateMessage);
function renderStages(levels){
 const tabs=document.querySelector('#stage-tabs');const panels=document.querySelector('#stage-details');tabs.replaceChildren();panels.replaceChildren();stageSelect.replaceChildren(new Option('Selecciona una etapa',''));
 const controls=[];
 function activate(index,focus=false){
  controls.forEach(({tab,panel},current)=>{const active=current===index;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;panel.hidden=!active;tab.querySelector('.tab-state-text').textContent=active?'Etapa seleccionada':'Consultar etapa';});
  if(focus)controls[index].tab.focus();
 }
 levels.forEach((level,index)=>{
  stageSelect.add(new Option(level.name,level.name));
  const tab=document.createElement('button');tab.type='button';tab.className='stage-tab';tab.id=`stage-tab-${index}`;tab.setAttribute('role','tab');tab.setAttribute('aria-controls',`stage-panel-${index}`);
  for(const [className,text] of [['stage-tab-name',level.name],['stage-tab-phrase',level.phrase]]){const span=document.createElement('span');span.className=className;span.textContent=text;tab.append(span);}
  const state=document.createElement('span');state.className='tab-state';const stateText=document.createElement('span');stateText.className='tab-state-text';stateText.textContent='Consultar etapa';
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('aria-hidden','true');const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d','M12 5v14M5 12h14');svg.append(path);state.append(stateText,svg);tab.append(state);
  const panel=document.createElement('div');panel.className='stage-panel';panel.id=`stage-panel-${index}`;panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',tab.id);panel.tabIndex=0;
  const title=document.createElement('h3');title.textContent=level.phrase;
  const copy=document.createElement('div');copy.className='stage-panel-copy';const description=document.createElement('p');description.textContent=level.description;
  const action=document.createElement('button');action.type='button';action.className='stage-choice';action.textContent=`Preparar visita para ${level.name}`;
  action.addEventListener('click',()=>{stageSelect.value=level.name;updateMessage();document.querySelector('#visita').scrollIntoView({behavior:'instant'});stageSelect.focus({preventScroll:true});document.dispatchEvent(new CustomEvent('continental:visit'));});
  copy.append(description,action);panel.append(title,copy);tabs.append(tab);panels.append(panel);controls.push({tab,panel});
  tab.addEventListener('click',event=>{activate(index);stageSelect.value=level.name;updateMessage();if(event.detail>0)document.dispatchEvent(new CustomEvent('continental:stage-change'));});
  tab.addEventListener('keydown',event=>{
   let next=index;
   if(event.key==='ArrowRight')next=(index+1)%levels.length;else if(event.key==='ArrowLeft')next=(index+levels.length-1)%levels.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=levels.length-1;else return;
   event.preventDefault();activate(next,true);stageSelect.value=levels[next].name;updateMessage();
  });
 });activate(0);
}
const fallbackStages=['Preescolar','Primaria','Secundaria','Preparatoria'].map(name=>({name,phrase:'Información de esta etapa',description:'Consulta con el colegio los programas y requisitos de ingreso.'}));
async function loadContent(){
 try{
  const response=await fetch('content.json',{cache:'no-cache'});if(!response.ok)throw new Error('content');const data=await response.json();if(!data.hero?.title||!Array.isArray(data.levels)||!data.levels.length)throw new Error('schema');content=data;
  document.querySelectorAll('[data-text]').forEach(element=>{const value=get(data,element.dataset.text);if(typeof value==='string')element.textContent=value;});
  document.querySelectorAll('[data-school]').forEach(element=>element.textContent=data.school||'Continental 2000');
  renderStages(data.levels);updateMessage();
  const phone=String(data.contact?.phoneDisplay||'').replace(/\D/g,'');if(phone)document.querySelector('#phone-link').href=`tel:+${phone.length===10?'52':''}${phone}`;
  const email=data.contact?.email;if(email&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))document.querySelector('#email-link').href=`mailto:${email}`;
 }catch{document.querySelector('#load-status').hidden=false;renderStages(fallbackStages);}
}
document.querySelector('#reload').addEventListener('click',()=>window.location.reload());
document.querySelectorAll('.photo img').forEach(image=>image.addEventListener('error',()=>{image.hidden=true;document.querySelector('.photo-caption').textContent='La fotografía no está disponible. Puedes consultar la información del colegio más abajo.';}));
loadContent();
