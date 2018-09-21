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
            baseHue: Math.random() * 360,
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
        /*
        // Start hue shift animation
        setInterval(() => {
            this.setBaseHue(4, true);
        }, 500);
        */
    }

    componentDidUpdate(newState) {
        if (newState.panning !== this.state.panning) {
            this.setPanner(this.props.audioCtx, this.state.panner, this.state.panning);
        }

        if (newState.reverb !== this.state.reverb) {
            this.setReverbLevel(this.props.audioCtx, this.state.dryGain, this.state.wetGain, this.state.reverb);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.convolver === null && nextProps.convolver) { 
            this.state.panner.connect(this.state.dryGain);
            this.state.dryGain.connect(this.props.audioCtx.destination);
            this.state.panner.connect(this.state.wetGain);
            this.state.wetGain.connect(nextProps.convolver);
        };
    }

    setPanner = (audioCtx, panner, panValue) => {
        if (!audioCtx || !panner || !panValue || panValue < -10 || panValue > 10) { return; }

        panner.pan.setValueAtTime((panValue / 10), audioCtx.currentTime);
    }

    setReverbLevel = (audioCtx, dryGain, wetGain, reverbLevel) => {
        if (!audioCtx || !dryGain || !wetGain || reverbLevel < 0 || reverbLevel > 100) {
            console.log('Invalid parameters passed into \'setReverbLevel\'');
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
                display: `Loaded ${newCount}/${this.state.totalCount} Sounds`,
                loadedCount: newCount
            };
        });
    }

    setBaseHue = (newHue, isRelative) => {
        if (isRelative) { newHue = this.state.baseHue + newHue }
        this.setState({ baseHue: newHue % 360 })
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
                <div className="title">{this.props.name}</div>
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
                    min={-10} 
                    max={10} 
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
                    min={-12} 
                    max={12} 
                    value={this.state.tuning} 
                    handleInputRangeChange={this.handleInputRangeChange('tuning')} 
                    setDisplay={this.setDisplay}
                />
                <PadBank 
                    audioCtx={this.props.audioCtx}
                    convolver={this.props.convolver}
                    panner={this.state.panner}
                    keyMappings={this.props.keyMappings} 
                    baseHue={this.state.baseHue}
                    lastPlayedZone={this.state.lastPlayedZone}
                    lastPlayedKey={this.state.lastPlayedKey}
                    instrumentVolume={this.state.volume / 100}
                    instrumentPanning={this.state.panning / 10}
                    instrumentDetune={this.state.tuning * 100}
                    playSound={this.playSound}
                    setBaseHue={this.setBaseHue}
                    incrementLoadedCount={this.incrementLoadedCount}
                    setLastPlayed={this.setLastPlayed}
                    setDisplay={this.setDisplay}
                />
            </div>
        )
    }
}


 