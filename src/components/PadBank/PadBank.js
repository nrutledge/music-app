import React, { Component } from 'react';
import DrumPad from '../DrumPad/DrumPad';

export default class PadBank extends Component {
    render() {
        const { keyMappings, hiHatPosition, setHiHatPosition, setDisplay  } = this.props;

        const drumPads = keyMappings.map((keyMap, index) => {
            return <DrumPad 
                        triggerKey={keyMap.triggerKey} 
                        hardSound={keyMap.hardSound} 
                        hardVolume={keyMap.hardVolume} 
                        softSound={keyMap.softSound} 
                        softVolume={keyMap.softVolume} 
                        type={keyMap.type}
                        isHiHat={keyMap.isHiHat}
                        hiHatPosition={hiHatPosition}
                        setHiHatPosition={setHiHatPosition} 
                        setDisplay={setDisplay}
                        key={index}
                        hue={(this.props.baseHue + ((index + 1) * -10)) % 360}
                    />
        });

        return (
            <div className="pad-bank">
                {drumPads}
            </div> 
        );
    }
} 