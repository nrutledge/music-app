import React from 'react';
import DrumPad from '../DrumPad/DrumPad';

const PadBank = ({ keyMappings, currentHiHatPosition, setHiHatPosition }) => {
    const drumPads = keyMappings.map(keyMap => {
        return <DrumPad 
                    triggerKey={keyMap.triggerKey} 
                    hardSound={keyMap.hardSound} 
                    hardVolume={keyMap.hardVolume} 
                    softSound={keyMap.softSound} 
                    softVolume={keyMap.softVolume} 
                    type={keyMap.type}
                    currentHiHatPosition={currentHiHatPosition}
                    setHiHatPosition={setHiHatPosition} 
                />
    });

    return (
        <div>
            {drumPads}
        </div> 
    );
}

export default PadBank;