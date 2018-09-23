import React, { Component } from 'react';
import Instrument from '../Instrument/Instrument';
import loadAudioBuffer from '../../common/loadAudioBuffer';
import { drums, synth, piano, synthDrums, cello } from '../../common/keyMappings'
import './App.css';

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      convolver: null,
      convolverBuffer: null,
      convolverGain: audioCtx.createGain(),
      baseHue: Math.random() * 360,
      recording: [],
      isPlaybackOn: false,
      playbackIndex: 0,
      playbackStartTime: 0
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

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isPlayBackOn && this.state.isPlayBackOn !== prevState.isPlayBackOn) {
      this.playRecording(true, this.state.recording, this.state.playbackIndex, this.state.playbackStartTime);
    }
  }

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

  recordPlayedKey = (ctxCurrentTime, key) => {
    const played = {
      key: key,
      time: ctxCurrentTime
    }
    this.setState({ recording: [...this.state.recording, played] });
  }

  playRecording = (isPlaybackOn, recording, playbackIndex, playbackStartTime) => {
    console.log('playRecording')
    if (!isPlaybackOn || !recording || !recording[playbackIndex] || !playbackStartTime) { 
      return; 
    }

    const nextPlaybackIndex = playbackIndex + 1;

    // Set playbackStartTime to the first played key's start time
    // (isPlaybackOn should be passed in directly as true for initial call)
    if (this.state.isPlaybackOn === false) {
      playbackStartTime = recording[nextPlaybackIndex].time;
    }

    // Set next playback time 
    const nextKeyPlayTime = (recording[nextPlaybackIndex].time - playbackStartTime);

    setTimeout(() => {
      this.setState({ playbackIndex: nextPlaybackIndex, playbackStartTime: playbackStartTime }, () => console.log('playbackIndex', this.state.playbackIndex));
      this.playRecording(this.state.isPlaybackOn, recording, nextPlaybackIndex, playbackStartTime)

      console.log('setTimeout', nextKeyPlayTime);
    }, nextKeyPlayTime)
  }

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
          recording={this.state.recording}
          playbackIndex={this.state.playbackIndex}
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
          recording={this.state.recording}
          playbackIndex={this.state.playbackIndex}
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
          recording={this.state.recording}
          playbackIndex={this.state.playbackIndex}
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
          recording={this.state.recording}
          playbackIndex={this.state.playbackIndex}
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
          recording={this.state.recording}
          playbackIndex={this.state.playbackIndex}
        />
        <div>
          <button onClick={() => {
            this.setState({ 
              isPlayBackOn: true,
              playbackStartTime: this.state.recording[this.state.playbackIndex + 1].time
            });;
          }} >Click to Play recording (and cross your fucking fingers!</button>
        </div>
      </div>
    );
  }
}
