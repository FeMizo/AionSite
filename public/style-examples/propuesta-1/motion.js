const projects=[{name:'Molotes El Tradicional',image:'molotes.webp',url:'https://molotes.aionsite.com.mx/',category:'Diseño web'},{name:'Lobby PM',image:'lobbypm.webp',url:'https://lobbypm.aionsite.com.mx/',category:'Diseño web'},{name:'Fateh',image:'fateh.webp',url:'https://www.fateh.net/',category:'Proyecto del portafolio'}];
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const sliders=[];
let paused=reduced.matches;
function renderSlides(){return projects.map((p,i)=>`<article class="swiper-slide project-slide"><div class="project-top"><span>${String(i+1).padStart(2,'0')} / PROYECTO DE AIONSITE</span><span>${p.category}</span></div><img src="assets/${p.image}" width="2880" height="1590" alt="Sitio de ${p.name}, del portafolio de AionSite"><div class="project-info"><h3>${p.name}</h3><a href="${p.url}" target="_blank" rel="noopener noreferrer">Ver sitio ↗</a></div></article>`).join('')}
function setSlideAccess(swiper){swiper.slides.forEach((slide,i)=>{const active=i===swiper.activeIndex;slide.setAttribute('aria-hidden',String(!active));slide.querySelectorAll('a,button').forEach(link=>link.tabIndex=active?0:-1)})}
const a11y={enabled:true,prevSlideMessage:'Anterior',nextSlideMessage:'Siguiente',firstSlideMessage:'Primera diapositiva',lastSlideMessage:'Última diapositiva',slideLabelMessage:'{{index}} de {{slidesLength}}',itemRoleDescriptionMessage:'diapositiva'};
function setPause(value){paused=value;document.documentElement.classList.toggle('motion-paused',value);document.querySelectorAll('.motion-toggle').forEach(button=>{button.textContent=value?'Activar movimiento':'Pausar movimiento';button.setAttribute('aria-pressed',String(value))});sliders.forEach(sw=>{if(!sw.destroyed)sw.params.speed=value?0:700})}
if(document.querySelector('.hero-slider')){
 const hero=new Swiper('.hero-slider',{effect:'fade',fadeEffect:{crossFade:true},speed:paused?0:700,allowTouchMove:true,keyboard:{enabled:true,onlyInViewport:true},navigation:{nextEl:'.hero-next',prevEl:'.hero-prev'},a11y,on:{init(sw){setSlideAccess(sw)},slideChange(sw){setSlideAccess(sw);document.querySelector('.hero-count').textContent=`${String(sw.activeIndex+1).padStart(2,'0')} / 03`}}});sliders.push(hero);
 document.getElementById('project-slides').innerHTML=renderSlides();
 const portfolio=new Swiper('.projects-slider',{effect:'coverflow',initialSlide:1,slidesPerView:'auto',centeredSlides:true,grabCursor:true,speed:paused?0:700,coverflowEffect:{rotate:18,stretch:15,depth:150,modifier:1,slideShadows:true},keyboard:{enabled:true,onlyInViewport:true},navigation:{nextEl:'.projects-next',prevEl:'.projects-prev'},a11y,on:{init(sw){setSlideAccess(sw);document.querySelector('.project-count').textContent=`${sw.activeIndex+1} / ${projects.length}`},slideChange(sw){setSlideAccess(sw);document.querySelector('.project-count').textContent=`${sw.activeIndex+1} / ${projects.length}`}}});sliders.push(portfolio);
}
let labSwiper;
function initializeLab(effect='coverflow'){
 const stage=document.querySelector('.lab-stage');if(!stage)return;
 const index=labSwiper?.activeIndex??0;
 if(labSwiper){const pos=sliders.indexOf(labSwiper);if(pos>=0)sliders.splice(pos,1);labSwiper.destroy(true,true)}
 stage.dataset.effect=effect;
 document.querySelector('.lab-slider').innerHTML=`<div class="swiper-wrapper">${renderSlides()}</div>`;
 const options={effect,speed:paused?0:700,initialSlide:index,grabCursor:true,slidesPerView:effect==='coverflow'?'auto':1,centeredSlides:effect==='coverflow',keyboard:{enabled:true,onlyInViewport:true},navigation:{nextEl:'.lab-next',prevEl:'.lab-prev'},a11y,fadeEffect:{crossFade:true},flipEffect:{slideShadows:true,limitRotation:true},cardsEffect:{perSlideOffset:9,perSlideRotate:3,slideShadows:true},coverflowEffect:{rotate:30,stretch:0,depth:180,modifier:1,slideShadows:true},creativeEffect:{limitProgress:2,perspective:true,prev:{translate:['-18%',0,-280],rotate:[0,0,-8],opacity:.35},next:{translate:['100%',0,0],rotate:[0,0,8]}},on:{init(sw){setSlideAccess(sw);document.querySelector('.lab-count').textContent=`${sw.activeIndex+1} / ${projects.length}`},slideChange(sw){setSlideAccess(sw);document.querySelector('.lab-count').textContent=`${sw.activeIndex+1} / ${projects.length}`}}};
 labSwiper=new Swiper('.lab-slider',options);sliders.push(labSwiper);
 document.querySelectorAll('[data-effect-button]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.effectButton===effect)));
 document.querySelector('.lab-status').textContent=paused?'Movimiento pausado. Puedes cambiar de proyecto sin transición.':`Efecto ${effect} activo. Usa las flechas, el teclado o desliza.`;
}
if(document.querySelector('.lab-slider')){initializeLab();document.querySelectorAll('[data-effect-button]').forEach(button=>button.addEventListener('click',()=>initializeLab(button.dataset.effectButton)))}
document.querySelectorAll('.motion-toggle').forEach(button=>button.addEventListener('click',()=>{setPause(!paused);if(labSwiper)initializeLab(document.querySelector('.lab-stage').dataset.effect)}));
reduced.addEventListener('change',event=>{setPause(event.matches);if(labSwiper)initializeLab(document.querySelector('.lab-stage').dataset.effect)});
setPause(paused);
document.querySelectorAll('details a').forEach(link=>link.addEventListener('click',()=>{link.closest('details').open=false}));
window.previewState={get sliders(){return sliders},get paused(){return paused},get effect(){return document.querySelector('.lab-stage')?.dataset.effect}};
