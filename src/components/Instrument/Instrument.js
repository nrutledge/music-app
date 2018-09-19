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
            tuning: 0
        }
    }

    // Start hue shift animation
    componentDidMount() {
        const initialDisplay = detectMobile() ? 'Not mobile optimized' : 'Booting...'
        this.setDisplay(initialDisplay);
        setInterval(() => {
            this.setBaseHue(3, true);
        }, 300);
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

    handleTuningChange = (e) => {
        this.setState({ tuning: parseFloat(e.target.value) });
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
                    name="Tuning" 
                    min={-12} 
                    max={12} 
                    value={this.state.tuning} 
                    handleTuningChange={this.handleTuningChange} 
                    setDisplay={this.setDisplay}
                />
                <PadBank 
                    audioCtx={this.props.audioCtx}
                    keyMappings={this.props.keyMappings} 
                    baseHue={this.state.baseHue}
                    lastPlayedZone={this.state.lastPlayedZone}
                    lastPlayedKey={this.state.lastPlayedKey}
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


 