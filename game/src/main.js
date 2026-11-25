(() => {
  const {createWorld,createRandom,createRenderer,createInput,createSound,stageShot,clock}=RushKitchen;
  const params=new URLSearchParams(location.search),shot=params.get('shot');
  const seed=Number.parseInt(params.get('seed')??'',10),world=createWorld(createRandom(Number.isFinite(seed)?seed:Math.floor(Math.random()*4294967296)));
  const canvas=document.getElementById('game'),status=document.getElementById('status'),summary=document.getElementById('shift-state');
  const icon=document.createElement('canvas');icon.width=64;icon.height=64;
  RushKitchen.art.burger(icon.getContext('2d'),[1,2,3,4,6],32,59,.8);
  const favicon=document.createElement('link');favicon.rel='icon';favicon.href=icon.toDataURL();document.head.append(favicon);
  const draw=createRenderer(canvas),sound=createSound(),bestKey='starline.rush.best';
  let best=0;try{best=Math.max(0,Number(localStorage.getItem(bestKey))||0);}catch{}
  const {state}=world;
  let screen=stageShot(shot||'start',world),getHover=()=>null,last=performance.now(),displayTime=0,lastSummary=-1;
  function describe(){
    const orders=state.tickets.map(order=>`#${order.id} ${order.recipe.name} [${order.recipe.layers.join(',')}] ${Math.max(0,Math.ceil(order.remaining))}s`).join('; ');
    summary.textContent=screen==='title'?'title | Clock 1:30 | Start Shift':`${screen} | Clock ${clock(90-state.elapsed)} | Coins ${state.score} | Served ${state.served} | Streak ${state.streak} | Grill ${state.grill===null?'idle':RushKitchen.doneness(state.grill)} | Tray ${state.stock.length} | Build ${state.plate.map(layer=>layer.id).join(',')||'empty'} | Pickup ${state.pass.map(layer=>layer.id).join(',')||'empty'} | ${orders}`;
  }
  function dispatch(key){
    sound.unlock();
    if(key==='mute'){sound.toggle();status.textContent=sound.muted?'Sound muted.':'Sound on.';return;}
    if(key==='start'||key==='restart'){
      world.reset();screen='play';last=performance.now();lastSummary=-1;sound.play('start');status.textContent='Shift started. First order: The Classic. Click the grill or press G.';
    }else if(screen==='play'){const event=world.action(key);sound.play(event);status.textContent=state.note;}
    describe();
  }
  function paint(){draw(state,screen,{time:displayTime,muted:sound.muted,best:shot?state.score:best,hover:getHover()});}
  if(shot){displayTime=state.elapsed;describe();requestAnimationFrame(()=>{paint();requestAnimationFrame(()=>{paint();window.__shotReady=true;});});return;}
  getHover=createInput(canvas,()=>screen,dispatch);
  status.textContent='Rush Kitchen. Click Start Shift or press Enter.';describe();
  document.addEventListener('visibilitychange',()=>{last=performance.now();});
  function frame(now){
    const delta=document.hidden?0:Math.max(0,(now-last)/1000);last=now;displayTime+=delta;
    if(screen==='play'){
      const missed=state.missed,orders=state.orders;
      let remaining=Math.min(delta,90);
      while(remaining>0&&!state.over){const step=Math.min(remaining,1/30);world.step(step);remaining-=step;}
      if(state.over){
        screen='end';sound.play('end');best=Math.max(best,state.score);try{localStorage.setItem(bestKey,String(best));}catch{}
        status.textContent=`Shift complete. ${state.score} coins. ${state.served} burgers served. Personal best ${best}.`;describe();
      }else if(missed!==state.missed){status.textContent=state.note;sound.play('error');}
      else if(orders!==state.orders){const order=state.tickets.at(-1);status.textContent=`New order: ${order.recipe.name}.`;sound.play('arrive');}
      if(Math.floor(state.elapsed*4)!==lastSummary){lastSummary=Math.floor(state.elapsed*4);describe();}
    }
    paint();requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
