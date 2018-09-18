import React, { Component } from 'react';
import DrumPad from '../DrumPad/DrumPad';

export default class PadBank extends Component {
    render() {
        const drumPads = this.props.keyMappings.map((keyMap, index) => {
            return <DrumPad 
                        audioCtx={this.props.audioCtx}
                        key={this.props.index}
                        name={keyMap.name}
                        source={keyMap.source}
                        triggerKey={keyMap.triggerKey} 
                        sound={keyMap.sound} 
                        volume={keyMap.volume} 
                        pan={keyMap.pan}
                        exclusiveZone={keyMap.exclusiveZone}
                        lastPlayedZone={this.props.lastPlayedZone}
                        lastPlayedKey={this.props.lastPlayedKey}
                        hue={(this.props.baseHue + ((index + 1) * -8)) % 360}
                        playSound={this.props.playSound}
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