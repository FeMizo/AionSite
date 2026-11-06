const media=matchMedia('(prefers-reduced-motion: reduce)');
let paused=media.matches;
const number=Number(document.body.dataset.proposal);
const a11y={enabled:true,prevSlideMessage:'Anterior',nextSlideMessage:'Siguiente',firstSlideMessage:'Primera diapositiva',lastSlideMessage:'Última diapositiva',slideLabelMessage:'{{index}} de {{slidesLength}}'};
function access(sw){sw.slides.forEach((slide,i)=>{slide.setAttribute('aria-hidden',String(i!==sw.activeIndex));slide.querySelectorAll('a,button').forEach(el=>el.tabIndex=i===sw.activeIndex?0:-1)})}
const projects=[{name:'Molotes El Tradicional',url:'https://molotes.aionsite.com.mx/'},{name:'Lobby PM',url:'https://lobbypm.aionsite.com.mx/'},{name:'Fateh',url:'https://www.fateh.net/'}];
function update(sw){access(sw);document.querySelector(number===4?'.scope-count':'.work-count').textContent=`${String(sw.activeIndex+1).padStart(2,'0')} / 03`;if(number===5){document.getElementById('work-name').textContent=projects[sw.activeIndex].name;document.getElementById('work-url').href=projects[sw.activeIndex].url}}
const selector=number===4?'.scope-flip':'.work-creative';
const slider=new Swiper(selector,{speed:paused?0:800,grabCursor:true,effect:number===4?'flip':'creative',a11y,flipEffect:{slideShadows:true,limitRotation:true},creativeEffect:{limitProgress:2,prev:{translate:['-8%',0,-280],rotate:[0,0,-5],opacity:.3},next:{translate:['100%',0,0],rotate:[0,0,6]}},navigation:{nextEl:number===4?'.scope-next':'.work-next',prevEl:number===4?'.scope-prev':'.work-prev'},on:{init:update,slideChange:update}});
document.querySelector(number===4?'.scope-demo':'.work-grid').addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();slider.slideNext()}if(event.key==='ArrowLeft'){event.preventDefault();slider.slidePrev()}});
function pause(value){paused=value;document.documentElement.classList.toggle('motion-paused',value);const button=document.getElementById('pause');button.textContent=value?'Activar movimiento':'Pausar movimiento';button.setAttribute('aria-pressed',String(value));slider.params.speed=value?0:800}
document.getElementById('pause').addEventListener('click',()=>pause(!paused));media.addEventListener('change',event=>pause(event.matches));pause(paused);
document.querySelectorAll('.mobile a').forEach(a=>a.addEventListener('click',()=>a.closest('details').open=false));
window.proposalState={number,get slider(){return slider},get paused(){return paused}};

const stageTabs=[...document.querySelectorAll('[data-stage]')];
const stageAssets=['molotes.webp','lobbypm.webp','fateh.webp'];
function selectStage(index,focus=false){stageTabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1});const item=projects[index];const img=document.getElementById('stage-image');img.src='assets/'+stageAssets[index];img.alt='Sitio de '+item.name;document.getElementById('stage-domain').textContent=new URL(item.url).hostname;document.getElementById('stage-link').href=item.url;document.getElementById('stage-panel').setAttribute('aria-labelledby',stageTabs[index].id);if(focus)stageTabs[index].focus()}
stageTabs.forEach((tab,index)=>{tab.addEventListener('click',()=>selectStage(index));tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(index+1)%3;else if(event.key==='ArrowLeft')next=(index+2)%3;else if(event.key==='Home')next=0;else if(event.key==='End')next=2;else return;event.preventDefault();selectStage(next,true)})});
