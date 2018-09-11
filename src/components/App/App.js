import React, { Component } from 'react';
import './App.css';
import PadBank from '../PadBank/PadBank';
import { keyMappings } from './keyMappings'

class App extends Component {
  constructor() {
    super();
    this.state = {
      display: 'Booting...',
      hiHatPosition: 'Hi-Hat Open',
      baseHue: Math.random() * 360,
      loadedCount: 0,
      totalCount: keyMappings.length
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setBaseHue(1, true);
    }, 100);
  }

  incrementLoadedCount = () => {
    if (this.state.loadedCount >= this.state.totalCount) { return; }

    this.setState({ 
      loadedCount: this.state.loadedCount + 1,
      display: `Loaded ${this.state.loadedCount + 1}/${this.state.totalCount} Sounds`
    });
  }

  setDisplay = (text) => {
    this.setState({ display: text });
  }

  setHiHatPosition = (hiHatPosition) => {
    this.setState({ hiHatPosition });
  }

  setBaseHue = (newHue, isRelative) => {
    if (isRelative) { newHue = this.state.baseHue + newHue }
    this.setState({ baseHue: newHue % 360 })
}

  render() {
    return (
      <div className="app">
        <div id="drum-machine">
          <div 
            id="display" 
            style={{ 
              color: `hsl(${this.state.baseHue}, 70%, 85%)`,
              backgroundColor: `hsl(${this.state.baseHue + 180}, 30%, 30%)`,
              border: `3px solid hsl(${this.state.baseHue}, 80%, 75%)`
            }}
          >
            {this.state.display}
          </div>
          <PadBank 
            keyMappings={ keyMappings } 
            hiHatPosition={this.state.hiHatPosition} 
            baseHue={this.state.baseHue}
            setDisplay={this.setDisplay}
            setHiHatPosition={this.setHiHatPosition} 
            setBaseHue={this.setBaseHue}
            incrementLoadedCount={this.incrementLoadedCount}
          />
        </div>
      </div>
    );
  }
}

export default App;
