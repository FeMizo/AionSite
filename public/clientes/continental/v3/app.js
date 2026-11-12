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
let stageSliderCleanup = () => {};
function renderStages(levels){
 stageSliderCleanup();
 const slider=document.querySelector('#stage-slider');
 const shell=document.querySelector('.stage-slider-shell');
 const prev=document.querySelector('#stage-prev');
 const next=document.querySelector('#stage-next');
 const position=document.querySelector('#stage-position');
 slider.replaceChildren();stageSelect.replaceChildren(new Option('Selecciona una etapa',''));
 const sticky=document.createElement('div');sticky.className='stage-sticky';
 shell.prepend(sticky);sticky.append(shell.querySelector('.slider-toolbar'),slider);
 function sizeStage(){
  const side=parseFloat(getComputedStyle(slider).getPropertyValue('--stage-side'))||176;
  slider.style.setProperty('--neighbor-offset',Math.max(0,(slider.clientWidth-side)/2-4)+'px');
  sticky.style.setProperty('--toolbar-height',shell.querySelector('.slider-toolbar').getBoundingClientRect().height+'px');
  sticky.style.setProperty('--stage-block-height',sticky.offsetHeight+'px');
 }
 const stageSizeObserver='ResizeObserver' in window?new ResizeObserver(sizeStage):null;
 stageSizeObserver?.observe(slider);stageSizeObserver?.observe(shell.querySelector('.slider-toolbar'));sizeStage();
 const slides=[];let current=-1;let frame=0;let settleTimer=0;let controlTimer=0;let controlled=false;let lastChange=0;
 const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
 const shortScreen=matchMedia('(max-height:700px) and (max-width:760px), (max-height:600px)');
 function activate(index,announce=false){
  if(index===current)return;const previous=current;current=index;lastChange=performance.now();if(previous!==-1)document.dispatchEvent(new CustomEvent('continental:stage-motion'));
  slides.forEach(({article,summary,detail},i)=>{
   const selected=i===index;article.classList.toggle('is-active',selected);
   article.style.setProperty('--side',Math.sign(i-index));
   article.classList.toggle('is-neighbor',Math.abs(i-index)===1);
   article.inert=Math.abs(i-index)>1;
   article.setAttribute('aria-hidden',String(Math.abs(i-index)>1));
   summary.setAttribute('aria-expanded',String(selected));summary.tabIndex=selected?-1:0;detail.inert=!selected;
   detail.setAttribute('aria-hidden',String(!selected));
  });
  prev.disabled=index===0;next.disabled=index===slides.length-1;
  position.textContent=`${index+1} de ${levels.length}`;

 }
 function range(){return Math.max(1,shell.offsetHeight-sticky.offsetHeight);}
 function go(index){
  index=Math.max(0,Math.min(levels.length-1,index));
  activate(index);
  if(shell.classList.contains('direct-stages'))return;
  controlled=true;clearTimeout(controlTimer);
  const top=shell.getBoundingClientRect().top+scrollY-parseFloat(getComputedStyle(sticky).top);
  window.scrollTo({top:top+range()*index/Math.max(1,levels.length-1),behavior:'smooth'});
  controlTimer=setTimeout(()=>{controlled=false;},900);
 }
 levels.forEach((level,index)=>{
  stageSelect.add(new Option(level.name,level.name));
  const article=document.createElement('article');article.className='stage-slide';article.setAttribute('role','group');article.setAttribute('aria-roledescription','diapositiva');article.setAttribute('aria-label',`${index+1} de ${levels.length}: ${level.name}`);
  const summary=document.createElement('button');summary.type='button';summary.className='stage-card-summary';summary.id=`stage-summary-${index}`;summary.setAttribute('aria-controls',`stage-panel-${index}`);
  const name=document.createElement('span');name.className='slide-name';name.textContent=level.name;
  const phrase=document.createElement('span');phrase.className='slide-phrase';phrase.textContent=level.phrase;
  const hint=document.createElement('span');hint.className='slide-hint';hint.textContent='Consultar esta etapa';summary.append(name);
  const compact=document.createElement('span');compact.className='stage-compact-name';compact.textContent=level.name;compact.setAttribute('aria-hidden','true');summary.append(compact);
  const detail=document.createElement('div');detail.className='stage-slide-detail';detail.id=`stage-panel-${index}`;detail.setAttribute('role','region');detail.setAttribute('aria-labelledby',summary.id);
  const title=document.createElement('h3');title.textContent=level.phrase;
  const description=document.createElement('p');description.textContent=level.description;
  const action=document.createElement('button');action.type='button';action.className='stage-choice';action.textContent=`Preparar visita para ${level.name}`;
  action.addEventListener('click',()=>{stageSelect.value=level.name;updateMessage();document.querySelector('#visita').scrollIntoView({behavior:'instant'});stageSelect.focus({preventScroll:true});document.dispatchEvent(new CustomEvent('continental:visit'));});
  detail.append(title,description,action);article.append(summary,detail);slider.append(article);slides.push({article,summary,detail});
  summary.addEventListener('click',()=>go(index));
 });
 activate(0);shell.classList.add('slider-in-view');
 const previousHandler=()=>go(current-1),nextHandler=()=>go(current+1);
 prev.addEventListener('click',previousHandler);next.addEventListener('click',nextHandler);
 const keyboardHandler=event=>{
  let index=current;
  if(event.key==='ArrowRight')index++;else if(event.key==='ArrowLeft')index--;
  else if(event.key==='Home')index=0;else if(event.key==='End')index=levels.length-1;else return;
  event.preventDefault();go(index);
 };
 slider.addEventListener('keydown',keyboardHandler);
 const scrollHandler=()=>{if(frame||controlled||shell.classList.contains('direct-stages'))return;frame=requestAnimationFrame(()=>{
  frame=0;const top=parseFloat(getComputedStyle(sticky).top);
  const progress=Math.max(0,Math.min(1,(top-shell.getBoundingClientRect().top)/range()));
  const step=progress*Math.max(1,levels.length-1);
  const target=Math.max(0,Math.min(levels.length-1,Math.round(step)));
  if(target!==current&&Math.abs(step-current)>.58){
   clearTimeout(settleTimer);
   const remaining=Math.max(0,620-(performance.now()-lastChange));
   if(remaining)settleTimer=setTimeout(scrollHandler,remaining);else activate(target);
  }
 });};
 window.addEventListener('scroll',scrollHandler,{passive:true});
 function syncMode(){const direct=motionPreference.matches||shortScreen.matches;shell.classList.toggle('direct-stages',direct);shell.querySelector('.slider-toolbar p').textContent=direct?'Elige una etapa con los controles':'Sigue bajando para explorar cada etapa';}
 syncMode();motionPreference.addEventListener('change',syncMode);shortScreen.addEventListener('change',syncMode);
 let touchStart=0;slider.addEventListener('touchstart',event=>{touchStart=event.touches[0].clientX;},{passive:true});
 slider.addEventListener('touchend',event=>{const dx=event.changedTouches[0].clientX-touchStart;if(Math.abs(dx)>55)go(current+(dx<0?1:-1));},{passive:true});
 window.addEventListener('resize',scrollHandler);
 stageSliderCleanup=()=>{stageSizeObserver?.disconnect();clearTimeout(settleTimer);clearTimeout(controlTimer);motionPreference.removeEventListener('change',syncMode);shortScreen.removeEventListener('change',syncMode);cancelAnimationFrame(frame);window.removeEventListener('scroll',scrollHandler);window.removeEventListener('resize',scrollHandler);prev.removeEventListener('click',previousHandler);next.removeEventListener('click',nextHandler);slider.removeEventListener('keydown',keyboardHandler);sticky.before(...sticky.children);sticky.remove();};

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
loadContent();
const stickyHeader=document.querySelector('.header-ground');
function updateHeaderOffset(){document.documentElement.style.setProperty('--header-height',`${stickyHeader.getBoundingClientRect().height}px`);}
if('ResizeObserver' in window)new ResizeObserver(updateHeaderOffset).observe(stickyHeader);
updateHeaderOffset();
