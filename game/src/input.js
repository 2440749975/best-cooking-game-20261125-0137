RushKitchen.createInput = function createInput(canvas, getScreen, dispatch) {
  const {controls, width, height} = RushKitchen;
  let hover = null;
  function hit(event) {
    const box = canvas.getBoundingClientRect();
    const pointX = (event.clientX - box.left) * width / box.width, pointY = (event.clientY - box.top) * height / box.height;
    const screen = getScreen();
    const keys = screen === 'title' ? ['start','mute'] : screen === 'end' ? ['restart','mute'] : Object.keys(controls).filter(key => key !== 'start' && key !== 'restart');
    return keys.find(key => {
      const [left,top,wide,tall] = controls[key];
      return pointX >= left && pointX < left + wide && pointY >= top && pointY < top + tall;
    }) ?? null;
  }
  function updateHover(event) { hover = hit(event); canvas.style.cursor = hover ? 'pointer' : 'default'; }
  canvas.addEventListener('pointermove',updateHover);
  canvas.addEventListener('pointerleave',() => { hover = null; });
  canvas.addEventListener('pointerdown',event => {
    if (event.button !== 0) return;
    event.preventDefault(); canvas.focus(); updateHover(event); if (hover) dispatch(hover);
  });
  window.addEventListener('keydown',event => {
    if (event.ctrlKey || event.altKey || event.metaKey) return;
    const code = event.code, digit = /^(?:Digit|Numpad)([1-6])$/.exec(code), screen = getScreen();
    const action = code === 'KeyM' ? 'mute' : screen !== 'play' ? (['Space','Enter','NumpadEnter'].includes(code) ? (screen === 'end' ? 'restart' : 'start') : null)
      : digit?.[1] ?? ({KeyG:'grill',Space:'serve',KeyX:'trash',Backspace:'trash'})[code];
    if (!action) return;
    event.preventDefault(); if (!event.repeat) dispatch(action);
  });
  return () => hover;
};
