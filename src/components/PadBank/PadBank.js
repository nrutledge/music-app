import React from 'react';
import DrumPad from '../DrumPad/DrumPad';

const PadBank = function(props) {
    const drumPads = props.keyMappings.map((keyMap, index) => {
        return <DrumPad 
                    audioCtx={props.audioCtx}
                    convolver={props.convolver}
                    panner={props.panner}
                    key={props.index}
                    name={keyMap.name}
                    source={keyMap.source}
                    triggerKey={keyMap.triggerKey} 
                    sound={keyMap.sound} 
                    volume={keyMap.volume} 
                    pan={keyMap.pan}
                    detune={keyMap.detune}
                    transitionTime={props.transitionTime}
                    instrumentVolume={props.instrumentVolume}
                    instrumentPanning={props.instrumentPanning}
                    instrumentDetune={props.instrumentDetune}
                    exclusiveZone={keyMap.exclusiveZone}
                    lastPlayedZone={props.lastPlayedZone}
                    lastPlayedKey={props.lastPlayedKey}
                    hue={props.hue}
                    playSound={props.playSound}
                    incrementLoadedCount={props.incrementLoadedCount}
                    setLastPlayed={props.setLastPlayed}
                    setDisplay={props.setDisplay}
                />
    });

    return (
        <div className="pad-bank">
            {drumPads}
        </div> 
    );
} 

export default PadBank;