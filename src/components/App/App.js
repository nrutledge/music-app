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
      baseHue: Math.random() * 360
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

  render() {
    // Set the amount to vary hue per instrument
    const instrumentCount = 5;
    const hueRange = 360;
    const hueShift = hueRange / instrumentCount; 

    return (
      <div className="app">
        <Instrument 
          audioCtx={audioCtx} 
          convolverGain={this.state.convolverGain} 
          setConvolverBuffer={this.setConvolverBuffer} 
          keyMappings={drums} 
          name={'Rock Drums (ง\'̀-\'́)ง'} 
          volume={80} 
          panning={0} 
          reverb={15}
          transitionTime={0.005}
          hue={this.state.baseHue + (hueShift * 0)}
        />
        <Instrument 
          audioCtx={audioCtx} 
          convolverGain={this.state.convolverGain} 
          setConvolverBuffer={this.setConvolverBuffer} 
          keyMappings={synthDrums} 
          name={'Synth Drums'} 
          volume={55} 
          panning={0} 
          reverb={10}
          transitionTime={0.005}
          hue={this.state.baseHue + (hueShift * 1)}
        />
        <Instrument 
          audioCtx={audioCtx} 
          convolverGain={this.state.convolverGain} 
          setConvolverBuffer={this.setConvolverBuffer} 
          keyMappings={piano} 
          name={'Piano'} 
          volume={100} 
          panning={-25} 
          reverb={25}
          transitionTime={0.005}
          hue={this.state.baseHue + (hueShift * 2)}
        />
        <Instrument 
          audioCtx={audioCtx} 
          convolverGain={this.state.convolverGain} 
          setConvolverBuffer={this.setConvolverBuffer} 
          keyMappings={synth} 
          name={'Synth'} 
          volume={55} 
          panning={25} 
          reverb={20}
          transitionTime={0.005}
          hue={this.state.baseHue + (hueShift * 3)}
        />
        <Instrument 
          audioCtx={audioCtx} 
          convolverGain={this.state.convolverGain} 
          setConvolverBuffer={this.setConvolverBuffer} 
          keyMappings={cello} 
          name={'Cello'} 
          volume={40} 
          panning={-7} 
          reverb={55}
          transitionTime={0.008}
          hue={this.state.baseHue + (hueShift * 4)}
        />
      </div>
    );
  }
}
