import React, { Component } from 'react';
import { connect } from 'react-redux';

import audioCtx, { Reverb } from '../../services/audio';
import ControlsContainer from '../../containers/ControlsContainer';
import PadBank from '../PadBank/PadBank';
import { handleKeyEvent } from '../../services';
import Instrument from '../Instrument/Instrument';
import { detectBrowser } from '../../services';
import './Studio.css';

export class Studio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecordingOn: false,
      isPlaybackOn: false
    }
    this.reverb = new Reverb(0.88, 1000);
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
    const browserWarning = !detectBrowser().isChrome && 
      <div className="browser-warning">This browser is not supported. Please use Chrome.</div>;

    return (
      <div className="studio">
        <ControlsContainer />
        <div className="workspace">
            {browserWarning}
          <div className="section-top">
            {this.props.instruments.map((instrument, index) => {
              return (
                <Instrument
                  key={instrument.id}
                  audioCtx={audioCtx}
                  reverb={this.reverb} 
                  sounds={instrument.sounds} 
                  name={instrument.name} 
                  volume={instrument.volume}
                  panning={instrument.panning}
                  reverbLevel={instrument.reverb}
                  stopDelay={instrument.stopDelay}
                  decayTime={instrument.decayTime}
                  transitionTime={instrument.transitionTime}
                  hue={instrument.hue}              
                />
              )
            })}
          </div>
          <div class="section-bottom">
            <PadBank />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ instruments }) => ({ instruments }))(Studio);