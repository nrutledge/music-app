import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaTrash } from 'react-icons/fa';

import * as actions from '../../actions';
import Sound from '../Sound/Sound';
import { Gain, Panner, Splitter } from '../../services/audio';
import InstrumentDisplay from '../InstrumentDisplay/InstrumentDisplay';
import InputRange from '../InputRange/InputRange';
import detectBrowser from '../../util/detectBrowser';
import './Instrument.css';

class Instrument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sounds: this.props.sounds,
      displayContent: '',
      loadedCount: 0,
      volume: this.props.volume || 100,
      panning: this.props.panning || 0,
      tuning: this.props.tuning || 0,
      reverbLevel: this.props.reverbLevel || 0,
      stopDelay: this.props.stopDelay,
      decayTime: this.props.decayTime
    }
    this.gain = new Gain(this.props.volume / 100);
    this.panner = new Panner(this.props.panning / 50);
    this.splitter = new Splitter();
  }

  componentDidMount() {
    const initialDisplay = detectBrowser().isMobile ? 'Not mobile optimized' : 'Booting...'
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
    const totalCount = this.state.sounds.length;

    if (this.state.loadedCount >= totalCount) { return; }

    this.setState(prevState => { 
      const newCount = prevState.loadedCount + 1;
      let newDisplayContent = '';
      if (newCount === totalCount) {
        newDisplayContent = 'Ready to Play';
      } else {
        newDisplayContent = `Loaded ${newCount}/${totalCount} Sounds`;
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
    const sounds = this.state.sounds.map(sound => {
      return <Sound
        triggerKey={sound.triggerKey}
        instrumentId={this.props.id}
        instrumentInput={this.gain}
        source={sound.source}
        volume={sound.volume}
        detune={sound.detune}
        instrumentVolume={this.state.volume}
        instrumentPanning={this.state.panning}
        instrumentDetune={this.state.tuning * 100}
        stopDelay={this.state.stopDelay}
        decayTime={this.state.decayTime}
        incrementLoadedCount={this.incrementLoadedCount}
      />
    });

    return (
      <div 
        className="instrument" 
        onClick={() => this.props.toggleInstrumentRecord(this.props.id)}
      >
        <div className="instrument__container-top">
          <button 
            className="instrument__button-clear" 
            onClick={event => {
              event.stopPropagation();
              this.props.clearRecording(this.props.id);
            }}
          >
            <FaTrash />
          </button>
        </div>
        <InstrumentDisplay 
          hue={this.props.hue} 
          displayName={this.props.name} 
          displayContent={this.state.displayContent} 
          armed={this.props.armed}
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
        {sounds}
      </div>
    )
  }
}
 
export default connect(null, actions)(Instrument);