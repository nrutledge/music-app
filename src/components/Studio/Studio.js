import React, { Component } from 'react';

import audioCtx, { Reverb } from '../../services/audio';
import ControlsContainer from '../../containers/ControlsContainer';
import { handleKeyEvent } from '../../services';
import Instrument from '../Instrument/Instrument';
import keyMappings from '../../config/keyMappings';
import instruments from '../../config/instruments';
import './Studio.css';

export default class Studio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseHue: Math.random() * 360,
      isRecordingOn: false,
      isPlaybackOn: false
    }
    this.reverb = new Reverb();
  }

  componentDidMount() {
    window.focus();
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);  
    this.reverb.connect(audioCtx.destination);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);       
  }

  handleKeyDown = handleKeyEvent(this.props.keyPress, false);
  handleKeyUp = handleKeyEvent(this.props.keyPress, true);

  render() {
    // Amount to vary hue between each instrument
    const hueShift = 45; 

    return (
      <div className="studio">
        <ControlsContainer />
        <div className="workspace">
          {instruments.map((instrument, index) => {
            return (
              <Instrument
                key={instrument.id}
                audioCtx={audioCtx}
                reverb={this.reverb} 
                keyMappings={keyMappings[instrument.keyMapping]} 
                name={instrument.name} 
                volume={instrument.volume}
                panning={instrument.panning}
                reverbLevel={instrument.reverb}
                stopDelay={instrument.stopDelay}
                decayTime={instrument.decayTime}
                transitionTime={instrument.transitionTime}
                hue={this.state.baseHue + (hueShift * index)}              
              />
            )
          })}
        </div>
      </div>
    );
  }
}