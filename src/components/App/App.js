import React, { PureComponent } from 'react';
import Instrument from '../Instrument/Instrument';
import loadAudioBuffer from '../../common/loadAudioBuffer';
import { drums, synth, piano, synthDrums, cello } from '../../common/keyMappings'
import './App.css';

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

export default class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      convolver: null,
      convolverBuffer: null,
      convolverGain: audioCtx.createGain(),
      baseHue: Math.random() * 360,
      recording: [],
      isPlaybackOn: false,
      playback: {}
    }
  }

  componentDidMount() {
    this.loadConvolver(
      audioCtx, 
      this.state.convolverGain,
      loadAudioBuffer, 
      //'sounds/reverb/falkland_tennis_court_ortf.wav'
      //'sounds/reverb/hm2_000_ortf_48k.wav'
      'sounds/reverb/lyd3_000_ortf_48k.wav'
    ); 
  }

/*
  componentDidUpdate(prevProps, prevState) {

  }
*/

  loadConvolver = async (audioCtx, convolverGain, loadAudioBuffer, src) => {
    const audioBuffer = await loadAudioBuffer(audioCtx, src);
    const convolver = audioCtx.createConvolver();

    convolverGain.connect(convolver);
    convolver.connect(audioCtx.destination);
    convolver.buffer = audioBuffer;

    this.setState({ convolver });
  }

  setConvolverBuffer = (convolver, src) => {
    convolver.buffer = src;
  }

  recordPlayedKey = (ctxCurrentTime, key, action) => {
    // Convert any number keys to strings for use as object prop names
    key = typeof key === 'number' ? key.toString() : key;

    const recordingStartTime = (this.state.recording[0] && this.state.recording[0].time) ? 
      this.state.recording[0].time : ctxCurrentTime;

    const elapsedTime = ctxCurrentTime - recordingStartTime;
    const noteIndex = Math.round(elapsedTime * 50);
    const existingKeysAtIndex = this.state.recording[noteIndex];
    let newRecording = [...this.state.recording];
    
    if (!existingKeysAtIndex) {
      newRecording[noteIndex] = { time: ctxCurrentTime };
      // console.log('App 69 - newRecording[noteIndex]', newRecording[noteIndex]);
    } else {
      // console.log('App 71 - newRecording[noteIndex]', newRecording[noteIndex]);
    }
    newRecording[noteIndex][key] = action;

    this.setState({ recording: newRecording });
  }

  playRecording = (isPlaybackOn, recording, playbackIndex) => {
    if (!isPlaybackOn || !recording || !recording[playbackIndex]) { 
      return; 
    }

    setInterval(() => {
      const keysToPlay = recording[playbackIndex];
      playbackIndex++

      keysToPlay && this.setState({ playback: keysToPlay });
    }, 1000 / 50)

    this.setState({ isPlaybackOn: true });
  };

  render() {
    // Set the amount to vary hue per instrument
    const instrumentCount = 5;
    const hueRange = 270;
    const hueShift = hueRange / instrumentCount; 

    return (
      <div className="app">
        <Instrument 
          audioCtx={audioCtx} 
          convolverGain={this.state.convolverGain} 
          setConvolverBuffer={this.setConvolverBuffer} 
          keyMappings={drums} 
          name={'Rock Drums (ง\'̀-\'́)ง'} 
          volume={45} 
          panning={0} 
          reverb={8}
          stopDelay={2}
          decayTime={4}
          transitionTime={0.005}
          hue={this.state.baseHue + (hueShift * 0)}
          recordPlayedKey={this.recordPlayedKey}
          playback={this.state.playback}
        />
        <Instrument 
          audioCtx={audioCtx} 
          convolverGain={this.state.convolverGain} 
          setConvolverBuffer={this.setConvolverBuffer} 
          keyMappings={synthDrums} 
          name={'Synth Drums'} 
          volume={45} 
          panning={0} 
          reverb={8}
          stopDelay={0.1}
          decayTime={0.2}
          transitionTime={0.005}
          hue={this.state.baseHue + (hueShift * 1)}
          recordPlayedKey={this.recordPlayedKey}
          playback={this.state.playback}
        />
        <Instrument 
          audioCtx={audioCtx} 
          convolverGain={this.state.convolverGain} 
          setConvolverBuffer={this.setConvolverBuffer} 
          keyMappings={piano} 
          name={'Piano'} 
          volume={100} 
          panning={-25} 
          reverb={30}
          stopDelay={0.1}
          decayTime={0.1}
          transitionTime={0.005}
          hue={this.state.baseHue + (hueShift * 2)}
          recordPlayedKey={this.recordPlayedKey}
          playback={this.state.playback}
        />
        <Instrument 
          audioCtx={audioCtx} 
          convolverGain={this.state.convolverGain} 
          setConvolverBuffer={this.setConvolverBuffer} 
          keyMappings={synth} 
          name={'Synth'} 
          volume={70} 
          panning={25} 
          reverb={30}
          stopDelay={0.1}
          decayTime={0.1}
          transitionTime={0.005}
          hue={this.state.baseHue + (hueShift * 3)}
          recordPlayedKey={this.recordPlayedKey}
          playback={this.state.playback}
        />
        <Instrument 
          audioCtx={audioCtx} 
          convolverGain={this.state.convolverGain} 
          setConvolverBuffer={this.setConvolverBuffer} 
          keyMappings={cello} 
          name={'Cello'} 
          volume={45} 
          panning={-3} 
          reverb={55}
          stopDelay={0.01}
          decayTime={0.2}
          transitionTime={0.005}
          hue={this.state.baseHue + (hueShift * 4)}
          recordPlayedKey={this.recordPlayedKey}
          playback={this.state.playback}
        />
        <div>
          <button onClick={() => {
            this.playRecording(true, this.state.recording, 0);
          }} >Click to Play recording (and cross your fucking fingers!</button>
        </div>
      </div>
    );
  }
}
