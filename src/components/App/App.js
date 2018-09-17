import React, { Component } from 'react';
import Instrument from '../Instrument/Instrument';
import { drums, synth } from '../../common/keyMappings'
import './App.css';

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Instrument audioCtx={audioCtx} keyMappings={drums} />
        <Instrument audioCtx={audioCtx} keyMappings={synth} />
      </div>
    );
  }
}
