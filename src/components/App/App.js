import React, { Component } from 'react';
import './App.css';
import PadBank from '../PadBank/PadBank';
import { keyMappings } from './keyMappings'

class App extends Component {
  constructor() {
    super();
    this.state = {
      hiHatPosition: 'Hi-Hat Open'
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      console.log('Key: ', e.key);
    })
  }

  setHiHatPosition = (hiHatPos) => {
    this.setState({ 
      hiHatPosition: hiHatPos
    });
  }

  render() {
    return (
      <div id="drum-machine">
        <PadBank 
          keyMappings={ keyMappings } 
          currentHiHatPosition={this.state.hiHatPosition} 
          setHiHatPosition={this.setHiHatPosition} 
        />
      </div>
    );
  }
}

export default App;
