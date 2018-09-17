import React, { Component } from 'react';
import PadBank from '../PadBank/PadBank';
import detectMobile from '../../helpers/detectMobile';
import './Instrument.css';

export default class Instrument extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audioBuffers: {},
            sourcesPlaying: {},
            baseHue: Math.random() * 360,
            loadedCount: 0,
            totalCount: this.props.keyMappings.length,
            lastPlayedZone: 0,
            lastPlayedKey: ''
        }
    }

    // Start hue shift animation
    componentDidMount() {
        this.props.keyMappings.forEach(mapping => {
            this.loadAudioBuffer(mapping.source, mapping.name);
        });

        setInterval(() => {
            this.setBaseHue(3, true);
        }, 300);
    }

    incrementLoadedCount = () => {
        if (this.state.loadedCount >= this.state.totalCount) { return; }

        this.setState(prevState => { 
            return { loadedCount: prevState.loadedCount + 1 };
        });
    }

    setBaseHue = (newHue, isRelative) => {
        if (isRelative) { newHue = this.state.baseHue + newHue }
        this.setState({ baseHue: newHue % 360 })
    }

    setDisplay = (text) => {
        this.setState({ display: text });
    }

    loadAudioBuffer = async (src, name) => {
        const response = await fetch(src);
        const arrayBuffer = await response.arrayBuffer();
        const decodedData = await this.props.audioCtx.decodeAudioData(arrayBuffer);

        this.setState(prevState => { 
            const newAudioBuffers = { ...prevState.audioBuffers };
            newAudioBuffers[name] = decodedData;
            return { audioBuffers: newAudioBuffers };
        });
    }
    
    // @TODO: Update sources playing when play starts and stops
    playSound = (bufferName, detuneVal = 0) => {
        const source = this.props.audioCtx.createBufferSource();

        source.buffer = this.state.audioBuffers[bufferName];
        source.connect(this.props.audioCtx.destination);

        source.detune.value = detuneVal;
        source.start(0);

        this.setState(prevState => {
            const newSourcesPlaying = { ...prevState.sourcesPlaying };
            newSourcesPlaying[bufferName] = source;
            return { sourcesPlaying: newSourcesPlaying };
        });
    }

    setLastPlayed = (zone, key, name) => {
        this.setState({ 
            lastPlayedZone: zone,
            lastPlayedKey: key,
            display: name
        });
    }

    render() {
        const displayText = this.state.loadedCount === 0 
            ? detectMobile() ? 'Not mobile optimized' : 'Booting...' 
            : `Loaded ${this.state.loadedCount}/${this.state.totalCount} Sounds`

        return (
            <div id="drum-machine">
                <div 
                    id="display" 
                    style={{ 
                        color: `hsl(${this.state.baseHue}, 70%, 85%)`,
                        backgroundColor: `hsl(${this.state.baseHue + 180}, 30%, 30%)`,
                            border: `3px solid hsl(${this.state.baseHue}, 80%, 75%)`
                        }}
                >
                    {displayText}
                </div>
                <PadBank 
                    audioCtx={this.props.audioCtx}
                    keyMappings={this.props.keyMappings} 
                    baseHue={this.state.baseHue}
                    lastPlayedZone={this.state.lastPlayedZone}
                    lastPlayedKey={this.state.lastPlayedKey}
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


 