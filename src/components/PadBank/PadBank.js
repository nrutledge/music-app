import React, { Component } from 'react';
import DrumPad from '../DrumPad/DrumPad';

export default class PadBank extends Component {
    render() {
        const drumPads = this.props.keyMappings.map((keyMap, index) => {
            return <DrumPad 
                        key={this.props.index}
                        name={keyMap.name}
                        triggerKey={keyMap.triggerKey} 
                        sound={keyMap.sound} 
                        volume={keyMap.volume} 
                        exclusiveZone={keyMap.exclusiveZone}
                        lastPlayedZone={this.props.lastPlayedZone}
                        lastPlayedKey={this.props.lastPlayedKey}
                        hue={(this.props.baseHue + ((index + 1) * -8)) % 360}
                        setBaseHue={this.props.setBaseHue}
                        incrementLoadedCount={this.props.incrementLoadedCount}
                        setLastPlayed={this.props.setLastPlayed}
                        setDisplay={this.props.setDisplay}
                    />
        });

        return (
            <div className="pad-bank">
                {drumPads}
            </div> 
        );
    }
} 