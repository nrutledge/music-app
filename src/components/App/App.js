import React, { Component } from 'react';
import Instrument from '../Instrument/Instrument';
import loadAudioBuffer from '../../common/loadAudioBuffer';
import { drums, synth, piano } from '../../common/keyMappings'
import './App.css';

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      convolver: null
    }
  }

  componentDidMount() {
    this.loadConvolver(
      audioCtx, 
      loadAudioBuffer, 
      'sounds/reverb/falkland_tennis_court_ortf.wav'
    ); 
  }

  loadConvolver = async (audioCtx, loadAudioBuffer, src) => {
    const audioBuffer = await loadAudioBuffer(audioCtx, src);
    const convolver = audioCtx.createConvolver();

    convolver.connect(audioCtx.destination);
    convolver.buffer = audioBuffer;

    this.setState({ convolver });
  }

  render() {
    return (
      <div className="app">
        <Instrument audioCtx={audioCtx} convolver={this.state.convolver} keyMappings={drums} name={'Rock Drums (ง\'̀-\'́)ง'} volume={67} panning={0} />
        <Instrument audioCtx={audioCtx} convolver={this.state.convolver} keyMappings={piano} name={'~(˘▾˘~) Piano Major Chords'} volume={90} panning={-5} />
        <Instrument audioCtx={audioCtx} convolver={this.state.convolver} keyMappings={synth} name={'Synth Major Chords'} volume={75} panning={5} />
      </div>
    );
  }
}
