import React, { Component } from 'react';
import './App.css';
import PadBank from '../PadBank/PadBank';
import { keyMappings } from './keyMappings'

class App extends Component {
  constructor() {
    super();
    this.state = {
      display: 'Drum Machine',
      hiHatPosition: 'Hi-Hat Open'
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      console.log('Key: ', e.key);
    })
  }

  setDisplay = (text) => {
    this.setState({ display: text });
  }

  setHiHatPosition = (hiHatPosition) => {
    this.setState({ hiHatPosition });
  }

  render() {
    return (
      <div id="drum-machine">
        <div id="display">{this.state.display}</div>
        <PadBank 
          keyMappings={ keyMappings } 
          hiHatPosition={this.state.hiHatPosition} 
          setDisplay={this.setDisplay}
          setHiHatPosition={this.setHiHatPosition} 
        />
      </div>
    );
  }
}

export default App;
