import Tone from 'tone';
import clamp from '../util/clamp';

/**
 * The root audio node that other nodes connect to
 */
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
export default audioCtx;

Tone.setContext(audioCtx);

/**
 * Reverb node with a slightly improved interface over freeverb
 */
export class Reverb {
  constructor(roomSize = 0.9, dampening = 3000, level = 0.5) {
    this.roomSize = roomSize;
    this.dampening = dampening;
    this.level = level;

    // // Other nodes connect to this prop
    // this.input = this._reverb;
  }

  _reverb = new Tone.Freeverb();
  input = this._reverb;
  _level;

  get roomSize() { return this._reverb.roomSize.value; }
  set roomSize(value) { this._reverb.roomSize.value = clamp(value, 0, 1); }

  get dampening() { return this._reverb.dampening.value; }
  set dampening(value) { this._reverb.dampening.value = clamp(value, 0, 20000); }

  get level() { return this._level; }
  set level(value) {
    value = clamp(value, 0, 1);
    this._level = value;
    this._reverb.wet.value = value;
  }

  connect(audioNode) {
    const input = audioNode.input ? audioNode.input : audioNode;
    this._reverb.connect(input);
  }
}

/**
 * Splitter node used to route audio to two separate nodes
 */
export class Splitter {
  constructor(mix = 0) {
    this.mix = mix;
    this._inputGain.connect(this._leftGain);
    this._inputGain.connect(this._rightGain);
    this.input = this._inputGain;
  }

  _mix;
  _leftGain = audioCtx.createGain();
  _rightGain = audioCtx.createGain();
  _inputGain = audioCtx.createGain();

  get mix() { return this._mix; }
  set mix(value) {
    value = clamp(value, -1, 1);

    // Change range from (-1 to 1) to (0 to 1)
    value = (value + 1) / 2;

    this._leftGain.gain.setValueAtTime(1 - value, audioCtx.currentTime);
    this._rightGain.gain.setValueAtTime(value, audioCtx.currentTime);
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

/**
 * Gain for controlling volume
 */
export class Gain {
  constructor(level = 0.5) {
    this.level = level;
    this.input = this._gainNode;
  }

  _gainNode = audioCtx.createGain();

  get level() { return this._gainNode.gain.value; }
  set level(value) { 
    value = clamp(value, 0, 1);
    this._gainNode.gain.setValueAtTime(value, audioCtx.currentTime);
  }

  connect(audioNode) {
    this._gainNode.connect(audioNode);
  }
}

/**
 * Stereo panner node for controlling levels between left/right speakers
 */
export class Panner {
  constructor() {
    this.input = this._pannerNode;
  }

  _pannerNode = audioCtx.createStereoPanner();

  get panning() { return this._pannerNode.pan.value; }
  set panning(value) { 
    value = clamp(value, -1, 1);
    this._pannerNode.pan.setValueAtTime(value, audioCtx.currentTime);
  }

  connect(audioNode) {
    this._pannerNode.connect(audioNode);
  }
}

/**
 * Audio source node that plays provided source files (mp3, wav, etc.)
 */
export class AudioSource {
  constructor(
    volume = 0.5, 
    detune = 0, 
    instrumentVolume = 1, 
    instrumentDetune = 0, 
    attackTime = 0.005, 
    stopDelay = 0,
    decayTime = 0
  ) {
    this.volume = volume;
    this.detune = detune;
    this.instrumentVolume = instrumentVolume; 
    this.instrumentDetune = instrumentDetune;
    this.attackTime = attackTime;
    this.stopDelay = stopDelay;
    this.decayTime = decayTime;
  }

  _connectedTo = null;
  _audioBuffer = null;
  _audioSource = null;
  _gainNode = null;
  _isPlaying = false;
  _lastStartTime = audioCtx.currentTime;
  _onLoaded = null;
  _volume;
  _detune;
  _instrumentVolume;
  _instrumentDetune;
  _attackTime;
  _stopDelay;
  _decayTime;

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
      .then(arrayBuffer => audioCtx.decodeAudioData(arrayBuffer))
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
    const source = audioCtx.createBufferSource();
    const gainNode = audioCtx.createGain();
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
      let playedTime = audioCtx.currentTime - this._lastStartTime;
      if (playedTime > fastCutoff) { playedTime = fastCutoff; }
      newVolume *= minVolume + (playedTime * (1 - minVolume) / fastCutoff);
    }
  
    // Randomly vary volume to simulate variations in real playing
    const maxVariance = 0.1;
    newVolume -= Math.random() * maxVariance;
  
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(newVolume * this.instrumentVolume, audioCtx.currentTime + this.attackTime);
  
    source.detune.setValueAtTime(this.instrumentDetune + this.detune, audioCtx.currentTime);
  
    source.connect(gainNode);
    gainNode.connect(this._connectedTo);
  
    source.start(audioCtx.currentTime);
  
    this._audioSource = source;
    this._gainNode = gainNode;
    this._isPlaying = true;
    this._lastStartTime = audioCtx.currentTime;

    source.onended = () => { 
      this._isPlaying = false;
    };
  }

  stop() {
    if (this.stopDelay === 0) {
      this._gainNode && this._gainNode.gain.linearRampToValueAtTime(
        0, 
        audioCtx.currentTime + this.decayTime
      ); 
    } else {
    setTimeout(() => {
      this._gainNode && this._gainNode.gain.linearRampToValueAtTime(
        0, 
        audioCtx.currentTime + this.decayTime
      );
    }, this.stopDelay * 1000)
    }
  }

  connect(audioNode) {
    this._connectedTo = audioNode.input ? audioNode.input : audioNode;
  }
}



