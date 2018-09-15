import React, { Component } from 'react';
import DrumPad from '../DrumPad/DrumPad';

export default class PadBank extends Component {
    render() {
        const drumPads = this.props.keyMappings.map((keyMap, index) => {
            return <DrumPad 
                        triggerKey={keyMap.triggerKey} 
                        sound={keyMap.sound} 
                        volume={keyMap.volume} 
                        name={keyMap.name}
                        isHiHat={keyMap.isHiHat}
                        hiHatPosition={this.props.hiHatPosition}
                        key={this.props.index}
                        hue={(this.props.baseHue + ((index + 1) * -8)) % 360}
                        setHiHatPosition={this.props.setHiHatPosition} 
                        setDisplay={this.props.setDisplay}
                        setBaseHue={this.props.setBaseHue}
                        incrementLoadedCount={this.props.incrementLoadedCount}
                    />
        });

        return (
            <div className="pad-bank">
                {drumPads}
            </div> 
        );
    }
} 