import React, { Component } from 'react';
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
            panner: this.props.audioCtx.createStereoPanner(),
            dryGain: this.props.audioCtx.createGain(),
            wetGain: this.props.audioCtx.createGain(),
            volume: this.props.volume || 100,
            panning: this.props.panning || 0,
            tuning: this.props.tuning || 0,
            reverb: this.props.reverb || 0,
        }
    }

    componentDidMount() {
        const initialDisplay = detectMobile() ? 'Not mobile optimized' : 'Booting...'
        this.setDisplayContent(initialDisplay);
        this.setReverbLevel(
          this.props.audioCtx, 
          this.state.dryGain, 
          this.state.wetGain, 
          this.state.reverb
        );
        this.state.panner.connect(this.state.dryGain);
        this.state.dryGain.connect(this.props.audioCtx.destination);
        this.state.panner.connect(this.state.wetGain);
        this.state.wetGain.connect(this.props.convolverGain);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.panning !== prevState.panning) {
            this.setPanner(this.props.audioCtx, this.state.panner, this.state.panning);
        }

        if (this.state.reverb !== prevState.reverb) {
            this.setReverbLevel(
              this.props.audioCtx, 
              this.state.dryGain, 
              this.state.wetGain, 
              this.state.reverb
            );
        }
    }

    setPanner = (audioCtx, panner, panValue) => {
        if (!audioCtx || !panner || !panValue || panValue < -50 || panValue > +50) { return; }

        panner.pan.setValueAtTime((panValue / 50), audioCtx.currentTime);
    }

    setReverbLevel = (audioCtx, dryGain, wetGain, reverbLevel) => {
        if (!audioCtx || !dryGain || !wetGain || reverbLevel < 0 || reverbLevel > 100) {
            console.log('setReverbLevel: Invalid parameters');
            return;
        }
        dryGain.gain.setValueAtTime(1 - (reverbLevel / 100), audioCtx.currentTime);
        wetGain.gain.setValueAtTime((reverbLevel / 100), audioCtx.currentTime);
    }

    incrementLoadedCount = () => {
        if (this.state.loadedCount >= this.state.totalCount) { return; }

        this.setState(prevState => { 
            const newCount = prevState.loadedCount + 1;
            return { 
                displayContent: `Loaded ${newCount}/${this.state.totalCount} Sounds`,
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
                    value={this.state.reverb}
                    handleInputRangeChange={this.handleInputRangeChange('reverb')} 
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
                    audioCtx={this.props.audioCtx}
                    convolver={this.props.convolver}
                    panner={this.state.panner}
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


 