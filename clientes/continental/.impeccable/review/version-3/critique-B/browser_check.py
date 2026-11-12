from playwright.sync_api import sync_playwright
import json, pathlib, time
out=pathlib.Path('.impeccable/review/version-3/critique-B')
results={}
with sync_playwright() as p:
 b=p.chromium.launch(headless=True)
 for name,w,h,reduce in [('desktop',1250,695,False),('mobile',375,812,False),('reduced',375,812,True)]:
  page=b.new_page(viewport={'width':w,'height':h},reduced_motion='reduce' if reduce else 'no-preference')
  logs=[];page.on('console',lambda m:logs.append({'type':m.type,'text':m.text}));page.on('pageerror',lambda e:logs.append({'pageerror':str(e)}))
  page.goto('http://127.0.0.1:8794/v3/index.html');page.wait_for_selector('.stage-slide');page.wait_for_timeout(1600)
  page.screenshot(path=str(out/(name+'-top.png')))
  def state():
   return page.evaluate('''()=>{let r=e=>{let a=e.getBoundingClientRect();return {x:a.x,y:a.y,width:a.width,height:a.height,bottom:a.bottom,right:a.right}};let a=document.querySelector('.stage-slide.is-active');return {scrollY,viewport:[innerWidth,innerHeight],scrollWidth:document.documentElement.scrollWidth,position:document.querySelector('#stage-position').textContent,header:r(document.querySelector('.header-ground')),sticky:r(document.querySelector('.stage-sticky')),slider:r(document.querySelector('.stage-slider')),active:r(a),summary:r(a.querySelector('button')),detail:r(a.querySelector('.stage-slide-detail')),action:r(a.querySelector('.stage-choice')),transition:getComputedStyle(a).transition,scale:getComputedStyle(document.querySelector('#colegio')).scale,select:document.querySelector('#stage').value}}''')
  data={'initial':state()}
  start=page.evaluate('''()=>{let s=document.querySelector('.stage-slider-shell'),t=document.querySelector('.stage-sticky');return s.getBoundingClientRect().top+scrollY-parseFloat(getComputedStyle(t).top)}''')
  length=page.evaluate('document.querySelector(".stage-slider-shell").offsetHeight-document.querySelector(".stage-sticky").offsetHeight')
  data['range']=length;data['steps']=[]
  for i in range(4):
   page.evaluate('(y)=>scrollTo(0,y)',start+length*i/3);page.wait_for_timeout(600);data['steps'].append(state());page.screenshot(path=str(out/(name+'-stage-'+str(i+1)+'.png')))
  page.locator('#stage-slider').focus();page.keyboard.press('Home');page.wait_for_timeout(550);data['keyboardHome']=state();page.keyboard.press('ArrowRight');page.wait_for_timeout(550);data['keyboardRight']=state();page.keyboard.press('End');page.wait_for_timeout(550);data['keyboardEnd']=state()
  page.locator('.stage-slide.is-active .stage-choice').focus();data['actionFocused']=state();page.keyboard.press('Enter');page.wait_for_timeout(350);data['request']={'focus':page.evaluate('document.activeElement.id'),'value':page.locator('#stage').input_value(),'message':page.locator('#request-message').inner_text()}
  if name=='desktop':
   data['mutation']=page.evaluate('''()=>{document.title='[Human] Continental evidence';let s=document.createElement('script');s.dataset.preflight='true';document.head.append(s);return !!document.querySelector('script[data-preflight]')}''')
   try:
    page.add_script_tag(url='http://localhost:8400/detect.js');page.wait_for_timeout(3000);data['overlayInjection']='success in isolated headless browser; not user-visible'
   except Exception as e:data['overlayInjection']=str(e)
  data['logs']=logs;results[name]=data;page.close()
 b.close()
(out/'browser.json').write_text(json.dumps(results,indent=2),encoding='utf8')
print(json.dumps(results,indent=2))
