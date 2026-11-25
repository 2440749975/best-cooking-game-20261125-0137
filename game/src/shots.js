RushKitchen.stageShot = function stageShot(name,world) {
  world.reset();
  const {state}=world;
  function advance(target) {while(state.elapsed<target&&!state.over)world.step(Math.min(1/60,target-state.elapsed));}
  function cook(){world.action('grill');advance(state.elapsed+3.2);world.action('grill');}
  function build(order){for(const id of order.recipe.layers)world.action(String(id));}
  if(name==='end'){
    while(state.elapsed<83){
      if(!state.tickets.length){advance(state.elapsed+.9);continue;}
      const order=state.tickets[0];cook();build(order);world.action('serve');advance(state.elapsed+3.8);
    }
    advance(90);return 'end';
  }
  for(const start of [1,8,15]){advance(start);cook();build(state.tickets[0]);world.action('serve');}
  advance(22);cook();build(state.tickets[0]);
  advance(27);cook();
  for(const id of state.tickets[1].recipe.layers.slice(0,3))world.action(String(id));
  world.action('grill');advance(state.elapsed+3.35);
  return name==='play'?'play':'title';
};
