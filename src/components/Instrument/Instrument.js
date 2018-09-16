import React, { Component } from 'react';
import PadBank from '../PadBank/PadBank';
import detectMobile from '../../helpers/detectMobile';
import './Instrument.css';

export default class Instrument extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: detectMobile() ? 'Not mobile optimized' : 'Booting...',
            baseHue: Math.random() * 360,
            loadedCount: 0,
            totalCount: this.props.keyMappings.length,
            lastPlayedZone: 0,
            lastPlayedKey: ''
        }
    }

    // Start hue shift animation
    componentDidMount() {
        setInterval(() => {
            this.setBaseHue(3, true);
        }, 300);
    }

    incrementLoadedCount = () => {
        if (this.state.loadedCount >= this.state.totalCount) { return; }

        this.setState({ 
            loadedCount: this.state.loadedCount + 1,
            display: `Loaded ${this.state.loadedCount + 1}/${this.state.totalCount} Sounds`
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

    render() {
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
                    {this.state.display}
                </div>
                <PadBank 
                    keyMappings={this.props.keyMappings} 
                    baseHue={this.state.baseHue}
                    lastPlayedZone={this.state.lastPlayedZone}
                    lastPlayedKey={this.state.lastPlayedKey}
                    setBaseHue={this.setBaseHue}
                    incrementLoadedCount={this.incrementLoadedCount}
                    setLastPlayed={this.setLastPlayed}
                    setDisplay={this.setDisplay}
                />
            </div>
        )
    }
}


 