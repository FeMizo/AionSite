const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let paused=reduced.matches;
let slider;
function applyPause(value){paused=value;document.documentElement.classList.toggle('motion-paused',value);const control=document.getElementById('motion-toggle');control.textContent=value?'Activar movimiento':'Pausar movimiento';control.setAttribute('aria-pressed',String(value));if(slider)slider.params.speed=value?0:850}
function slideAccess(sw){sw.slides.forEach((el,index)=>{const active=index===sw.activeIndex;el.setAttribute('aria-hidden',String(!active));el.querySelectorAll('a').forEach(link=>link.tabIndex=active?0:-1)})}
slider=new Swiper('.case-slider',{effect:'fade',fadeEffect:{crossFade:true},speed:paused?0:850,keyboard:{enabled:true,onlyInViewport:true},navigation:{nextEl:'.case-next',prevEl:'.case-prev'},a11y:{enabled:true,prevSlideMessage:'Proyecto anterior',nextSlideMessage:'Proyecto siguiente',firstSlideMessage:'Primer proyecto',lastSlideMessage:'Último proyecto',slideLabelMessage:'{{index}} de {{slidesLength}}'},on:{init(sw){slideAccess(sw)},slideChange(sw){slideAccess(sw);document.querySelector('.case-count').textContent=`${String(sw.activeIndex+1).padStart(2,'0')} / 03`}}});
const routeButtons=[...document.querySelectorAll('.route-trigger')];
function activateRoute(button){routeButtons.forEach(control=>{const active=control===button;control.setAttribute('aria-expanded',String(active));control.closest('.route-panel').classList.toggle('active',active);document.getElementById(control.getAttribute('aria-controls')).hidden=!active});document.querySelector('.route-panels').dataset.selected=button.closest('.route-panel').dataset.route}
routeButtons.forEach((button,index)=>{button.addEventListener('click',()=>activateRoute(button));button.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight'||event.key==='ArrowDown')next=(index+1)%routeButtons.length;if(event.key==='ArrowLeft'||event.key==='ArrowUp')next=(index+routeButtons.length-1)%routeButtons.length;if(event.key==='Home')next=0;if(event.key==='End')next=routeButtons.length-1;if(next!==undefined){event.preventDefault();event.stopPropagation();activateRoute(routeButtons[next]);routeButtons[next].focus()}})});
document.querySelectorAll('.mobile-menu a').forEach(link=>link.addEventListener('click',()=>link.closest('details').open=false));
document.getElementById('motion-toggle').addEventListener('click',()=>applyPause(!paused));
reduced.addEventListener('change',event=>applyPause(event.matches));
applyPause(paused);
window.proposal2={get paused(){return paused},get slider(){return slider},get route(){return document.querySelector('.route-panels').dataset.selected}};

