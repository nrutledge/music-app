import React, { Component } from 'react';
import PadBank from '../PadBank/PadBank';
import detectMobile from '../../helpers/detectMobile';
import InputRange from '../InputRange/InputRange';
import './Instrument.css';

export default class Instrument extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: '',
            hue: this.props.hue,
            loadedCount: 0,
            totalCount: this.props.keyMappings.length,
            lastPlayedZone: 0,
            lastPlayedKey: '',
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
        this.setDisplay(initialDisplay);
        this.setReverbLevel(this.props.audioCtx, this.state.dryGain, this.state.wetGain, this.state.reverb);

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
            this.setReverbLevel(this.props.audioCtx, this.state.dryGain, this.state.wetGain, this.state.reverb);
        }

        if (this.state.lastPlayedKey !== prevState.lastPlayedKey) {
            this.props.recordPlayedKey(this.props.audioCtx.currentTime, this.state.lastPlayedKey);
        }
    }

    /*
    componentWillReceiveProps(nextProps) {
        if (this.props.convolver === null && nextProps.convolver) { 
            this.state.panner.connect(this.state.dryGain);
            this.state.dryGain.connect(this.props.audioCtx.destination);
            this.state.panner.connect(this.state.wetGain);
            this.state.wetGain.connect(nextProps.convolver);
        };
    }
*/

    setPanner = (audioCtx, panner, panValue) => {
        if (!audioCtx || !panner || !panValue || panValue < -50 || panValue > +50) { return; }

        panner.pan.setValueAtTime((panValue / 50), audioCtx.currentTime);
    }

    setReverbLevel = (audioCtx, dryGain, wetGain, reverbLevel) => {
        if (!audioCtx || !dryGain || !wetGain || reverbLevel < 0 || reverbLevel > 100) {
            console.log('setReverbLevel: Invalid parameters');
            return;
        }
        console.log(this.props.name, reverbLevel);
        dryGain.gain.setValueAtTime(1 - (reverbLevel / 100), audioCtx.currentTime);
        wetGain.gain.setValueAtTime((reverbLevel / 100), audioCtx.currentTime);
    }

    incrementLoadedCount = () => {
        if (this.state.loadedCount >= this.state.totalCount) { return; }

        this.setState(prevState => { 
            const newCount = prevState.loadedCount + 1;
            return { 
                display: `Loaded ${newCount}/${this.state.totalCount} Sounds`,
                loadedCount: newCount
            };
        });
    }

    setDisplay = (text) => {
        this.setState({ display: text });
    }

    setLastPlayed = (zone, key, name) => {
        this.setState({ 
            lastPlayedZone: zone,
            lastPlayedKey: key,
            display: name
        });
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
                <div 
                    className="display" 
                    style={{ 
                        color: 'rgb(230, 230, 230)',
                        backgroundColor: `rgb(45, 45, 45)`,
                        border: `3px solid hsl(${this.props.hue}, 30%, 60%)`
                        }}
                >
                    <div className="display-title">
                        {this.props.name}
                    </div>
                    <div className="display-content">
                        {this.state.display}
                    </div>
                </div>
                <InputRange 
                    name="Volume" 
                    min={0} 
                    max={100} 
                    value={this.state.volume} 
                    handleInputRangeChange={this.handleInputRangeChange('volume')} 
                    setDisplay={this.setDisplay}
                />
                <InputRange 
                    name="Panning" 
                    min={-50} 
                    max={50} 
                    value={this.state.panning} 
                    handleInputRangeChange={this.handleInputRangeChange('panning')} 
                    setDisplay={this.setDisplay}
                />
                <InputRange 
                    name="Reverb" 
                    min={0} 
                    max={100} 
                    value={this.state.reverb}
                    handleInputRangeChange={this.handleInputRangeChange('reverb')} 
                    setDisplay={this.setDisplay}
                />
                <InputRange 
                    name="Tuning" 
                    min={-24} 
                    max={24} 
                    value={this.state.tuning} 
                    handleInputRangeChange={this.handleInputRangeChange('tuning')} 
                    setDisplay={this.setDisplay}
                />
                <PadBank 
                    audioCtx={this.props.audioCtx}
                    convolver={this.props.convolver}
                    panner={this.state.panner}
                    keyMappings={this.props.keyMappings} 
                    hue={this.state.hue}
                    lastPlayedZone={this.state.lastPlayedZone}
                    lastPlayedKey={this.state.lastPlayedKey}
                    stopDelay={this.props.stopDelay}
                    decayTime={this.props.decayTime}
                    transitionTime={this.props.transitionTime}
                    instrumentVolume={this.state.volume / 100}
                    instrumentPanning={this.state.panning / 10}
                    instrumentDetune={this.state.tuning * 100}
                    playSound={this.playSound}
                    incrementLoadedCount={this.incrementLoadedCount}
                    setLastPlayed={this.setLastPlayed}
                    setDisplay={this.setDisplay}
                    recording={this.props.recording}
                    playbackIndex={this.props.playbackIndex}
                />
            </div>
        )
    }
}


 