import React, { Component } from 'react';
import Instrument from '../Instrument/Instrument';
import { drums, synth, piano } from '../../common/keyMappings'
import './App.css';

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Instrument audioCtx={audioCtx} keyMappings={drums} name={'Rock Drums (ง\'̀-\'́)ง'} />
        <Instrument audioCtx={audioCtx} keyMappings={synth} name={'Some Synth Thing?'} />
        <Instrument audioCtx={audioCtx} keyMappings={piano} name={'~(˘▾˘~) Low Quality Piano'} />
      </div>
    );
  }
}
