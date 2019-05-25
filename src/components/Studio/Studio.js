import React, { Component } from 'react';
import { connect } from 'react-redux';

import audioCtx, { Reverb } from '../../services/audio';
import ControlsContainer from '../../containers/ControlsContainer';
import KeyPad from '../KeyPad/KeyPad';
import Modal from '../Modal/Modal';
import DrumPadSettings from '../DrumPadSettings/DrumPadSettings';
import handleKeyEvent from '../../util/handleKeyEvent';
import Instrument from '../Instrument/Instrument';
import detectBrowser from '../../util/detectBrowser';
import backgrounds from '../../config/backgrounds';
import './Studio.css';

export class Studio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecordingOn: false,
      isPlaybackOn: false,
      backgroundImage: backgrounds[Math.floor(Math.random() * backgrounds.length)]
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
      <div className="studio" style={{ 
        backgroundImage: `url(${this.state.backgroundImage})`
      }}>
        <ControlsContainer />
        <div className="workspace">
          {browserWarning}
          <Modal title="Test Modal" content={<DrumPadSettings instrumentId={1} />} />
          <div className="section-top">
            {Object.values(this.props.instruments).map((instrument, index) => {
              return (
                <Instrument
                  key={instrument.id}
                  id={instrument.id}
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
                  armed={instrument.armed}
                  muted={instrument.muted}           
                />
              )
            })}
          </div>
          <div className="section-bottom">
            <KeyPad />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ instruments: { byId } }) => ({ instruments: byId }))(Studio);