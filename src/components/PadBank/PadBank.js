import React from 'react';
import DrumPad from '../DrumPad/DrumPad';

const PadBank = ({ keyMappings, hiHatPosition, setHiHatPosition, setDisplay  }) => {
    const drumPads = keyMappings.map(keyMap => {
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
                />
    });

    return (
        <div className="pad-bank">
            {drumPads}
        </div> 
    );
}

export default PadBank;