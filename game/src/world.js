(() => {
  const { recipes, heat, duration } = RushKitchen;
  const sameLayers = (plate, recipe) => plate.length === recipe.layers.length && plate.every((layer, index) => layer.id === recipe.layers[index]);
  const match = (state, plate) => state.tickets.find(ticket => sameLayers(plate, ticket.recipe));
  const multiplier = streak => Math.min(3, 1 + Math.floor(streak / 3) * 0.5);
  function doneness(age) {
    if (age < heat.cooked) return 'Raw';
    if (age < heat.perfect) return 'Cooked';
    if (age < heat.late) return 'Perfect';
    return age < heat.burnt ? 'Cooked' : 'Burnt';
  }
  function createWorld(random) {
    const state = {};
    function arrive() {
      const index = state.orders++;
      const recipe = recipes[index < 5 ? index : 1 + Math.floor(random() * (recipes.length - 1))];
      const patience = 28 - 0.145 * state.elapsed + (recipe.layers.length - 3) * 0.8;
      state.tickets.push({ id: 101 + index, recipe, patience, remaining: patience });
    }
    function reset() {
      Object.assign(state, { elapsed: 0, over: false, score: 0, tips: 0, served: 0, perfects: 0, missed: 0,
        streak: 0, peak: 0, orders: 0, nextArrival: 6, tickets: [], grill: null, stock: [], plate: [], pass: [],
        note: '', noteAge: 0, noteType: '', lastLayer: -10, lastBell: -10, lastAction: '', lastPress: -10 });
      arrive();
    }
    function tell(note, type) { state.note = note; state.noteType = type; state.noteAge = 2.6; return type; }
    function penalize() { state.streak = 0; for (const ticket of state.tickets) ticket.remaining -= 2.5; }
    function step(seconds) {
      if (state.over) return;
      state.elapsed = Math.min(duration, state.elapsed + seconds); state.noteAge = Math.max(0, state.noteAge - seconds);
      if (state.grill !== null) state.grill = Math.min(heat.max, state.grill + seconds);
      for (const ticket of state.tickets) ticket.remaining -= seconds;
      const expired = state.tickets.filter(ticket => ticket.remaining <= 0);
      if (expired.length) {
        state.tickets = state.tickets.filter(ticket => ticket.remaining > 0); state.missed += expired.length; penalize();
        tell(`Ticket ${expired[0].id} walked out. Streak reset.`, 'error');
      }
      if (state.elapsed >= duration) { state.over = true; return; }
      const capacity = state.elapsed < 18 ? 1 : state.elapsed < 52 ? 2 : 3;
      if (state.tickets.length < capacity && state.elapsed >= state.nextArrival) {
        arrive(); state.nextArrival = state.elapsed + (capacity === 1 ? 5.5 : capacity === 2 ? 6 : 4.5);
      }
    }
    function moveToPass() {
      if (!state.pass.length && state.plate.at(-1)?.id === 6) { state.pass = state.plate; state.plate = []; }
    }
    function action(key) {
      if (state.over) return '';
      state.lastAction = key; state.lastPress = state.elapsed;
      if (key === 'grill') {
        if (state.grill === null) { state.grill = 0; return tell('Patty down. Lift in the mint zone.', 'sizzle'); }
        const quality = doneness(state.grill);
        if (quality === 'Raw') return tell('Still raw! Leave it on the grill.', 'warn');
        if (quality === 'Burnt') return tell('Burnt patty. Use the trash to clear the grill.', 'error');
        if (state.stock.length >= 3) return tell('Patty tray full. Use a cooked patty first.', 'warn');
        state.stock.push(quality); state.grill = null;
        return tell(quality === 'Perfect' ? 'Perfect sear! Patty in the tray.' : 'Patty cooked and in the tray.', quality === 'Perfect' ? 'perfect' : 'lift');
      }
      if (key === 'trash') {
        if (state.grill !== null && doneness(state.grill) === 'Burnt') { state.grill = null; return tell('Grill cleared. Ready for fresh beef.', 'discard'); }
        if (state.plate.length) { state.plate = []; return tell('Build plate cleared.', 'discard'); }
        if (state.pass.length) { state.pass = []; return tell('Pickup plate cleared.', 'discard'); }
        return tell('Nothing to discard.', 'warn');
      }
      if (key === 'serve') {
        state.lastBell = state.elapsed; const plate = state.pass.length ? state.pass : state.plate;
        if (!plate.length) return tell('No burger on the pass yet.', 'warn');
        const ticket = match(state, plate);
        if (!ticket) { penalize(); return tell('Wrong order! Check the layers or use the trash.', 'error'); }
        const perfect = plate.some(layer => layer.quality === 'Perfect');
        const tip = Math.max(0, Math.ceil(10 * ticket.remaining / ticket.patience));
        state.streak++; state.peak = Math.max(state.peak, state.streak);
        const reward = Math.round((plate.length * 3 + tip + (perfect ? 6 : 0)) * multiplier(state.streak));
        state.score += reward; state.tips += tip; state.perfects += Number(perfect); state.served++;
        state.tickets.splice(state.tickets.indexOf(ticket), 1);
        if (plate === state.pass) state.pass = []; else state.plate = []; moveToPass();
        if (!state.tickets.length) state.nextArrival = Math.min(state.nextArrival, state.elapsed + 0.85);
        return tell(`#${ticket.id} served! +${reward} coins, including ${tip} tip.`, 'serve');
      }
      const id = Number(key);
      if (!Number.isInteger(id) || id < 1 || id > 6) return '';
      if (state.plate.at(-1)?.id === 6) return tell('Both plates occupied. Ring the bell first.', 'warn');
      if (state.plate.length >= 7 && id !== 6) return tell('Plate full. Finish or discard this stack.', 'warn');
      if (id === 2 && !state.stock.length) return tell('Cook a patty, then lift it into the tray.', 'warn');
      state.plate.push({ id, quality: id === 2 ? state.stock.shift() : null }); state.lastLayer = state.elapsed; moveToPass();
      if (id === 6) return tell(match(state, state.pass) ? 'Order ready! Ring the service bell.' : 'Stack closed. Check your ticket.', 'stack');
      return tell(`${RushKitchen.ingredients[id - 1]} added.`, 'stack');
    }
    reset(); return { state, reset, step, action };
  }
  Object.assign(RushKitchen, {createWorld, doneness, match, multiplier});
})();
