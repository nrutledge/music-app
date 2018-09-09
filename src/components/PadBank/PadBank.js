import React from 'react';
import DrumPad from '../DrumPad/DrumPad';

const PadBank = ({ keyMappings, currentHiHatPosition, setHiHatPosition }) => {
    const drumPads = keyMappings.map(keyMap => {
        return <DrumPad 
                    src={keyMap.src} 
                    triggerKey={keyMap.key} 
                    hiHatPosition={keyMap.hiHatPosition}
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