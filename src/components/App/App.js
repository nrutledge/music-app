import React, { Component } from 'react';
import './App.css';
import PadBank from '../PadBank/PadBank';
import { keyMappings } from './keyMappings'

class App extends Component {
  constructor() {
    super();
    this.state = {
      display: 'Drum Machine',
      hiHatPosition: 'Hi-Hat Open',
      baseHue: Math.random() * 360
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      console.log('Key: ', e.key);
    })

    this.setBaseHue();
  }

  setDisplay = (text) => {
    this.setState({ display: text });
  }

  setHiHatPosition = (hiHatPosition) => {
    this.setState({ hiHatPosition });
  }

  setBaseHue() {
    setInterval(() => {
        this.setState({ baseHue: this.state.baseHue < 360 ? this.state.baseHue + 2 : 0 });
    }, 200);
}

  render() {
    return (
      <div className="app">
        <div id="drum-machine">
          <div 
            id="display" 
            style={{ 
              color: `hsl(${this.state.baseHue}, 70%, 85%)`,
              backgroundColor: `hsl(${(this.state.baseHue + 180) % 360}, 30%, 30%)`,
              border: `3px solid hsl(${this.state.baseHue}, 80%, 75%)`
            }}
          >{this.state.display}</div>
          <PadBank 
            keyMappings={ keyMappings } 
            hiHatPosition={this.state.hiHatPosition} 
            setDisplay={this.setDisplay}
            setHiHatPosition={this.setHiHatPosition} 
            baseHue={this.state.baseHue}
          />
        </div>
      </div>
    );
  }
}

export default App;
