import React, { Component } from 'react';
import ControlsContainer from '../../containers/ControlsContainer';
import { handleKeyEvent, loadAudioBuffer } from '../../services';
import Instrument from '../Instrument/Instrument';
import keyMappings from '../../config/keyMappings';
import reverbs from '../../config/reverbs';
import instruments from '../../config/instruments';
import './Studio.css';

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

export default class Studio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      convolver: null,
      convolverBuffer: null,
      convolverGain: audioCtx.createGain(),
      baseHue: Math.random() * 360,
      isRecordingOn: false,
      isPlaybackOn: false
    }
  }

  componentDidMount() {
    window.focus();
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);      

    this.loadConvolver(
      audioCtx, 
      this.state.convolverGain,
      loadAudioBuffer, 
      reverbs.tennisCourt
    ); 
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);       
  }

  loadConvolver = async (audioCtx, convolverGain, loadAudioBuffer, src) => {
    const audioBuffer = await loadAudioBuffer(audioCtx, src);
    const convolver = audioCtx.createConvolver();

    convolverGain.connect(convolver);
    convolver.connect(audioCtx.destination);
    convolver.buffer = audioBuffer;

    this.setState({ convolver });
  }

  setConvolverBuffer = (convolver, src) => {
    convolver.buffer = src;
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
                convolverGain={this.state.convolverGain} 
                setConvolverBuffer={this.setConvolverBuffer} 
                keyMappings={keyMappings[instrument.keyMapping]} 
                name={instrument.name} 
                volume={instrument.volume}
                panning={instrument.panning}
                reverb={instrument.reverb}
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