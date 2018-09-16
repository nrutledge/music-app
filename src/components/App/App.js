import React, { Component } from 'react';
import Instrument from '../Instrument/Instrument';
import { drums, synth } from '../../common/keyMappings'
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Instrument keyMappings={drums} />
        <Instrument keyMappings={synth} />
      </div>
    );
  }
}
