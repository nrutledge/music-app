import React, { Component } from 'react';
import { connect } from 'react-redux';
import { keyPress } from '../../actions';
import Controls from '../Controls/Controls';
import Instrument from '../Instrument/Instrument';
import { handleKeyEvent, loadAudioBuffer } from '../../common';
import { drums, synth, piano, synthDrums, cello } from '../../common/keyMappings'
import './Studio.css';

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

class Studio extends Component {
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
      'sounds/reverb/falkland_tennis_court_ortf.wav'
      //'sounds/reverb/hm2_000_ortf_48k.wav'
      //'sounds/reverb/lyd3_000_ortf_48k.wav'
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
/*
  playRecord = (key, isKeyUp) => {
    if (!key) { return; }

    this.setState(state => {
      const newKeysDown = { ...state.keysDown };
      isKeyUp ? delete newKeysDown[key] : newKeysDown[key] = true;
      
      return { keysDown: newKeysDown };
    });
  }
*/
  handleKeyDown = handleKeyEvent(this.props.keyPress, false);
  handleKeyUp = handleKeyEvent(this.props.keyPress, true);

  render() {
    // Set the amount to vary hue per instrument
    const instrumentCount = 5;
    const hueRange = 360;
    const hueShift = hueRange / instrumentCount; 

    return (
      <div className="studio">
        <Controls />
        <div className="workspace">
          <Instrument 
            audioCtx={audioCtx} 
            convolverGain={this.state.convolverGain} 
            setConvolverBuffer={this.setConvolverBuffer} 
            keyMappings={drums} 
            name={'Rock Drums (ง\'̀-\'́)ง'} 
            volume={50} 
            panning={0} 
            reverb={5}
            stopDelay={2}
            decayTime={4}
            transitionTime={0.005}
            hue={this.state.baseHue + (hueShift * 0)}
          />
          <Instrument 
            audioCtx={audioCtx} 
            convolverGain={this.state.convolverGain} 
            setConvolverBuffer={this.setConvolverBuffer} 
            keyMappings={synthDrums} 
            name={'Synth Drums'} 
            volume={45} 
            panning={0} 
            reverb={5}
            stopDelay={0.1}
            decayTime={0.2}
            transitionTime={0.005}
            hue={this.state.baseHue + (hueShift * 1)}
          />
          <Instrument 
            audioCtx={audioCtx} 
            convolverGain={this.state.convolverGain} 
            setConvolverBuffer={this.setConvolverBuffer} 
            keyMappings={piano} 
            name={'Piano'} 
            volume={100} 
            panning={-30} 
            reverb={35}
            stopDelay={0.04}
            decayTime={0.08}
            transitionTime={0.005}
            hue={this.state.baseHue + (hueShift * 2)}
          />
          <Instrument 
            audioCtx={audioCtx} 
            convolverGain={this.state.convolverGain} 
            setConvolverBuffer={this.setConvolverBuffer} 
            keyMappings={synth} 
            name={'Synth'} 
            volume={75} 
            panning={30} 
            reverb={35}
            stopDelay={0.04}
            decayTime={0.08}
            transitionTime={0.005}
            hue={this.state.baseHue + (hueShift * 3)}
          />
          <Instrument 
            audioCtx={audioCtx} 
            convolverGain={this.state.convolverGain} 
            setConvolverBuffer={this.setConvolverBuffer} 
            keyMappings={cello} 
            name={'Cello'} 
            volume={33} 
            panning={-3} 
            reverb={80}
            stopDelay={0.01}
            decayTime={0.2}
            transitionTime={0.005}
            hue={this.state.baseHue + (hueShift * 4)}
          />
        </div>
      </div>
    );
  }
}


export default connect(null, { keyPress })(Studio);