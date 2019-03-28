import Freeverb from 'freeverb';
import clamp from '../util/clamp';

// @TODO: remove export of audioCtx once DrumPad is refactored
export const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// @TODO: Use dependency injection or some other means instead of extending Audio class
/**
 * Base class for providing audio context to child classes
 */
export class Audio {
  static get audioCtx() { return audioCtx; }
} 

export class Reverb extends Audio {
  constructor(roomSize = 0.9, dampening = 3000, level = 0.5) {
    super();
    this._reverb = new Freeverb(Reverb.audioCtx);
    this.roomSize = roomSize;
    this.dampening = dampening;
    this.level = level;

    // Other nodes connect to this prop
    this.input = this._reverb;
  }

  get roomSize() { return this._reverb.roomSize; }
  set roomSize(value) { this._reverb.roomSize = clamp(value, 0, 1); }

  get dampening() { return this.dampening; }
  set dampening(value) { this._reverb.dampening = clamp(value, 0, 20000); }

  get level() { return this.dampening; }
  set level(value) {
    value = clamp(value, 0, 1);
    this._reverb.wet.value = value;
    this._reverb.dry.value = 1 - value;
  }

  connect(audioNode) {
    const input = audioNode.input ? audioNode.input : audioNode;
    this._reverb.connect(input);
  }
}

export class Splitter extends Audio {
  constructor(mix = 0) {
    super();
    this._mix = mix;
    this._leftGain = Splitter.audioCtx.createGain();
    this._rightGain = Splitter.audioCtx.createGain();
    this._inputGain = Splitter.audioCtx.createGain();
    this._inputGain.connect(this._leftGain);
    this._inputGain.connect(this._rightGain);
    this.input = this._inputGain;
  }

  get mix() { return this._mix; }
  set mix(value) {
    value = clamp(value, -1, 1);

    // Change range from (-1 to 1) to (0 to 1)
    value = (value + 1) / 2;

    this._leftGain.gain.setValueAtTime(1 - value, Splitter.audioCtx.currentTime);
    this._rightGain.gain.setValueAtTime(value, Splitter.audioCtx.currentTime);
  }

  connectL(audioNode) {
    const input = audioNode.input ? audioNode.input : audioNode;
    this._leftGain.connect(input);
  }

  connectR(audioNode) {
    const input = audioNode.input ? audioNode.input : audioNode;
    this._rightGain.connect(input);
  }
}

export class Gain extends Audio {
  constructor(level = 0.5) {
    super();
    this._gainNode = Gain.audioCtx.createGain();
    this.level = level;
    this.input = this._gainNode;
  }

  get level() { return this._gainNode.gain.value; }
  set level(value) { 
    value = clamp(value, 0, 1);
    this._gainNode.gain.setValueAtTime(value, Gain.audioCtx.currentTime);
  }

  connect(audioNode) {
    this._gainNode.connect(audioNode);
  }
}

export class Panner extends Audio {
  constructor() {
    super();
    this._pannerNode = Panner.audioCtx.createStereoPanner();
    this.input = this._pannerNode;
  }

  get panning() { return this._pannerNode.pan.value; }
  set panning(value) { 
    value = clamp(value, -1, 1);
    this._pannerNode.pan.setValueAtTime(value, Panner.audioCtx.currentTime);
  }

  connect(audioNode) {
    this._pannerNode.connect(audioNode);
  }
}

export class AudioSource extends Audio {
  constructor(
    volume = 0.5, 
    detune = 0, 
    instrumentVolume = 1, 
    instrumentDetune = 0, 
    attackTime = 0.005, 
    stopDelay = 0,
    decayTime = 0
  ) {
    super();
    this._connectedTo = null;
    this._audioBuffer = null;
    this._audioSource = null;
    this._gainNode = null;
    this._isPlaying = false;
    this._lastStartTime = AudioSource.audioCtx.currentTime;
    this._onLoaded = null;

    this._volume = volume;
    this._detune = detune;
    this._instrumentVolume = instrumentVolume; 
    this._instrumentDetune = instrumentDetune;
    this._attackTime = attackTime;
    this._stopDelay = stopDelay;
    this._decayTime = decayTime;

    this.volume = volume;
    this.detune = detune;
    this.instrumentVolume = instrumentVolume; 
    this.instrumentDetune = instrumentDetune;
    this.attackTime = attackTime;
    this.stopDelay = stopDelay;
    this.decayTime = decayTime;
  }
  get volume() { return this._volume; }
  set volume(value) { this._volume = clamp(value, 0, 1); }
  
  get detune() { return this._detune; }
  set detune(value) { this._detune = clamp(value, -4800, 4800); }

  get instrumentVolume() { return this._instrumentVolume; }
  set instrumentVolume(value) { this._instrumentVolume = clamp(value, 0, 1); }

  get instrumentDetune() { return this._instrumentDetune; }
  set instrumentDetune(value) { this._instrumentDetune = clamp(value, -4800, 4800); }

  get attackTime() { return this._attackTime; }
  set attackTime(value) { this._attackTime = clamp(value, 0, 60000); }

  get stopDelay() { return this._stopDelay; }
  set stopDelay(value) { this._stopDelay = clamp(value, 0, 60000); }

  get decayTime() { return this._decayTime; }
  set decayTime(value) { this._decayTime = clamp(value, 0, 60000); }

  set source(source) {
    fetch(source)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => AudioSource.audioCtx.decodeAudioData(arrayBuffer))
      .then(decodedData => {
        this._audioBuffer = decodedData;
        if (typeof this._onLoaded === 'function') { this._onLoaded(); }
      })
  }

  onLoaded(callback) {
    this._onLoaded = callback;
  }

  play() {
    if (!this._audioBuffer) { 
      return console.log('No audio buffer to play');
    }
    const source = AudioSource.audioCtx.createBufferSource();
    const gainNode = AudioSource.audioCtx.createGain();
    source.buffer = this._audioBuffer;
  
    // Max time (in seconds) that is considered to be fast playing
    // in case of repeated triggers of same drum pad
    const fastCutoff = 0.15;
  
    // Minimum volume to play during fast playing
    const minVolume = 0;
  
    // Change volume of sound based on trigger frequency to simulate
    // physics of shorter stick travel having less force
    let newVolume = this.volume;
    if (this._lastStartTime) {
      let playedTime = AudioSource.audioCtx.currentTime - this._lastStartTime;
      if (playedTime > fastCutoff) { playedTime = fastCutoff; }
      newVolume *= minVolume + (playedTime * (1 - minVolume) / fastCutoff);
    }
  
    // Randomly vary volume to simulate variations in real playing
    const maxVariance = 0.1;
    newVolume -= Math.random() * maxVariance;
  
    gainNode.gain.setValueAtTime(0, AudioSource.audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(newVolume * this.instrumentVolume, AudioSource.audioCtx.currentTime + this.attackTime);
  
    source.detune.setValueAtTime(this.instrumentDetune + this.detune, AudioSource.audioCtx.currentTime);
  
    source.connect(gainNode);
    gainNode.connect(this._connectedTo);
  
    source.start(AudioSource.audioCtx.currentTime);
  
    this._audioSource = source;
    this._gainNode = gainNode;
    this._isPlaying = true;
    this._lastStartTime = AudioSource.audioCtx.currentTime;

    source.onended = () => { 
      this._isPlaying = false;
    };
  }

  stop() {
    if (this.stopDelay === 0) {
      this._gainNode && this._gainNode.gain.linearRampToValueAtTime(
        0, 
        AudioSource.audioCtx.currentTime + this.decayTime
      ); 
    } else {
    setTimeout(() => {
      this._gainNode && this._gainNode.gain.linearRampToValueAtTime(
        0, 
        AudioSource.audioCtx.currentTime + this.decayTime
      );
    }, this.stopDelay * 1000)
    }
  }

  connect(audioNode) {
    this._connectedTo = audioNode.input ? audioNode.input : audioNode;
  }
}



