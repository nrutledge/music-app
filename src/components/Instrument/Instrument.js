import React, { Component } from 'react';

import { Gain, Panner, Splitter } from '../../services/audio';
import InstrumentDisplay from '../InstrumentDisplay/InstrumentDisplay';
import PadBank from '../PadBank/PadBank';
import InputRange from '../InputRange/InputRange';
import { detectMobile } from '../../services';
import './Instrument.css';

export default class Instrument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayContent: '',
      hue: this.props.hue,
      loadedCount: 0,
      totalCount: this.props.keyMappings.length,
      volume: this.props.volume || 100,
      panning: this.props.panning || 0,
      tuning: this.props.tuning || 0,
      reverbLevel: this.props.reverbLevel || 0,
    }
    this.gain = new Gain(this.props.volume / 100);
    this.panner = new Panner(this.props.panning / 50);
    this.splitter = new Splitter();
  }

  componentDidMount() {
    const initialDisplay = detectMobile() ? 'Not mobile optimized' : 'Booting...'
    this.setDisplayContent(initialDisplay);

    this.gain.connect(this.panner.input);
    this.panner.connect(this.splitter.input);
    this.splitter.connectL(this.props.audioCtx.destination);
    this.splitter.connectR(this.props.reverb.input);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.volume !== prevState.volume) {
      this.gain.level = this.state.volume / 100;
    }

    if (this.state.panning !== prevState.panning) {
      this.panner.panning = this.state.panning / 50;
    }

    if (this.state.reverbLevel !== prevState.reverb) {
      this.splitter.mix = (this.state.reverbLevel / 50) - 1;
    }
  }

  incrementLoadedCount = () => {
    if (this.state.loadedCount >= this.state.totalCount) { return; }

    this.setState(prevState => { 
      const newCount = prevState.loadedCount + 1;
      let newDisplayContent = '';
      if (newCount === this.state.totalCount) {
        newDisplayContent = 'Ready to Play';
      } else {
        newDisplayContent = `Loaded ${newCount}/${this.state.totalCount} Sounds`;
      }
      return { 
        displayContent: newDisplayContent,
        loadedCount: newCount
      };
    });
  }

  setDisplayContent = (text) => {
    this.setState({ displayContent: text });
  }

  handleInputRangeChange = (propName) => {
    return (e) => {
      const newState = {};
      newState[propName] = parseFloat(e.target.value);
      this.setState(newState);
    }
  }

  render() {
    return (
      <div className="instrument">
        <InstrumentDisplay 
          hue={this.state.hue} 
          displayName={this.props.name} 
          displayContent={this.state.displayContent} 
        />
        <InputRange 
          name="Volume" 
          min={0} 
          max={100} 
          value={this.state.volume} 
          handleInputRangeChange={this.handleInputRangeChange('volume')} 
          setDisplayContent={this.setDisplayContent}
        />
        <InputRange 
          name="Panning" 
          min={-50} 
          max={50} 
          value={this.state.panning} 
          handleInputRangeChange={this.handleInputRangeChange('panning')} 
          setDisplayContent={this.setDisplayContent}
        />
        <InputRange 
          name="Reverb" 
          min={0} 
          max={100} 
          value={this.state.reverbLevel}
          handleInputRangeChange={this.handleInputRangeChange('reverbLevel')} 
          setDisplayContent={this.setDisplayContent}
        />
        <InputRange 
          name="Tuning" 
          min={-24} 
          max={24} 
          value={this.state.tuning} 
          handleInputRangeChange={this.handleInputRangeChange('tuning')} 
          setDisplayContent={this.setDisplayContent}
        />
        <PadBank 
          instrumentInput={this.gain}
          keyMappings={this.props.keyMappings} 
          hue={this.state.hue}
          stopDelay={this.props.stopDelay}
          decayTime={this.props.decayTime}
          transitionTime={this.props.transitionTime}
          instrumentVolume={this.state.volume / 100}
          instrumentPanning={this.state.panning / 50}
          instrumentDetune={this.state.tuning * 100}
          incrementLoadedCount={this.incrementLoadedCount}
          setDisplayContent={this.setDisplayContent}
        />
      </div>
    )
  }
}


 