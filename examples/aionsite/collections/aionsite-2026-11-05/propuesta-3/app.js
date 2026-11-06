const media=matchMedia('(prefers-reduced-motion: reduce)');
let paused=media.matches;
const sliders=[];
function access(sw){sw.slides.forEach((slide,i)=>{slide.setAttribute('aria-hidden',String(i!==sw.activeIndex));slide.querySelectorAll('a,button').forEach(el=>el.tabIndex=i===sw.activeIndex?0:-1)})}
const a11y={enabled:true,prevSlideMessage:'Anterior',nextSlideMessage:'Siguiente',firstSlideMessage:'Primera diapositiva',lastSlideMessage:'Última diapositiva',slideLabelMessage:'{{index}} de {{slidesLength}}'};
const base={speed:paused?0:800,grabCursor:true,a11y};
function counter(selector,sw){document.querySelector(selector).textContent=`${String(sw.activeIndex+1).padStart(2,'0')} / 03`;access(sw)}
const hero=new Swiper('.hero-cards',{...base,effect:'cards',cardsEffect:{perSlideOffset:8,perSlideRotate:4,slideShadows:true},navigation:{nextEl:'.hero-next',prevEl:'.hero-prev'},on:{init(sw){counter('.hero-count',sw)},slideChange(sw){counter('.hero-count',sw)}}});sliders.push(hero);
// Keyboard control is scoped to the focused module, so adjacent sliders do not move together.
for(const [selector,sw] of [['.hero-work',hero]])document.querySelector(selector).addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();sw.slideNext()}if(event.key==='ArrowLeft'){event.preventDefault();sw.slidePrev()}});
function pause(value){paused=value;document.documentElement.classList.toggle('motion-paused',value);const button=document.getElementById('pause');button.setAttribute('aria-pressed',String(value));button.textContent=value?'Activar movimiento':'Pausar movimiento';sliders.forEach(sw=>sw.params.speed=value?0:800);document.querySelector('.magnet').style.cssText=''}
document.getElementById('pause').addEventListener('click',()=>pause(!paused));media.addEventListener('change',event=>pause(event.matches));pause(paused);
const magnet=document.querySelector('.magnet');
magnet.addEventListener('pointermove',event=>{if(paused||event.pointerType==='touch')return;const box=magnet.getBoundingClientRect();magnet.style.setProperty('--mx',`${Math.max(-12,Math.min(12,(event.clientX-box.left-box.width/2)*.15))}px`);magnet.style.setProperty('--my',`${Math.max(-12,Math.min(12,(event.clientY-box.top-box.height/2)*.15))}px`)});
magnet.addEventListener('pointerleave',()=>{magnet.style.setProperty('--mx','0px');magnet.style.setProperty('--my','0px')});
document.querySelectorAll('.mobile a').forEach(a=>a.addEventListener('click',()=>a.closest('details').open=false));
window.proposal3={get sliders(){return sliders},get paused(){return paused}};
const mobileJourney=matchMedia('(max-width:900px)');
function journeyHint(){document.querySelector('.scroll-caption>span').textContent=paused?'TRES PASOS: CONTENIDO, IDENTIDAD Y CONTACTO':mobileJourney.matches?'DESLIZA HORIZONTALMENTE ↔ PARA VER LOS TRES PASOS':'BAJA PARA RECORRER LOS TRES PASOS'}
mobileJourney.addEventListener('change',journeyHint);document.getElementById('pause').addEventListener('click',journeyHint);media.addEventListener('change',journeyHint);journeyHint();

