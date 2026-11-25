RushKitchen.createSound = function createSound() {
  let audio, volume, noise, muted = false;
  function unlock() {
    if (!audio) {
      const Audio = window.AudioContext || window.webkitAudioContext;
      if (!Audio) return;
      audio = new Audio(); volume = audio.createGain(); volume.gain.value = muted ? 0 : 0.19; volume.connect(audio.destination);
      noise = audio.createBuffer(1, audio.sampleRate / 3, audio.sampleRate);
      const samples = noise.getChannelData(0);
      for (let index = 0; index < samples.length; index++) samples[index] = Math.random()*2-1;
    }
    if (audio.state === 'suspended') audio.resume().catch(() => {});
  }
  function beep(pitch,delay,duration) {
    const start = audio.currentTime + delay, tone = audio.createOscillator(), gain = audio.createGain();
    tone.type='triangle'; tone.frequency.value=pitch;
    gain.gain.setValueAtTime(0.001,start); gain.gain.exponentialRampToValueAtTime(0.65,start+0.008); gain.gain.exponentialRampToValueAtTime(0.001,start+duration);
    tone.connect(gain); gain.connect(volume); tone.start(start); tone.stop(start+duration);
  }
  function play(event) {
    if (!audio || muted) return;
    if (event === 'sizzle') {
      const source=audio.createBufferSource(), filter=audio.createBiquadFilter(), gain=audio.createGain();
      source.buffer=noise; filter.type='highpass'; filter.frequency.value=2000; gain.gain.setValueAtTime(0.5,audio.currentTime); gain.gain.exponentialRampToValueAtTime(0.002,audio.currentTime+0.32);
      source.connect(filter); filter.connect(gain); gain.connect(volume); source.start(); return;
    }
    const notes={stack:[330],lift:[440,550],perfect:[523,784,1047],serve:[784,1175,1568],warn:[180],error:[190,130],discard:[280,210],start:[392,494,587,784],end:[784,659,587,784],arrive:[660,880]}[event];
    notes?.forEach((pitch,index)=>beep(pitch,index*0.075,event==='serve'?0.32:0.13));
  }
  return {unlock,play,get muted(){return muted;},toggle(){muted=!muted; if(volume) volume.gain.value=muted?0:0.19;}};
};
