const multiplier = 0.85;

export const drums = [
    {
        name: 'High Tom',
        triggerKey: 'q',
        source: 'sounds/drums/Tom High/Tom High 4.wav',
        volume: 1.0 * multiplier,
    }, 
    {
        name: 'Mid Tom',
        triggerKey: 'w',
        source: 'sounds/drums/Tom Mid/Tom Mid 4.wav',
        volume: 1.0 * multiplier
    }, 
    {
        name: 'Floor Tom',
        triggerKey: 'e',
        source: 'sounds/drums/Tom Floor/Tom Floor 5.wav',
        volume: 1.0 * multiplier
    }, 
    {
        name: 'Crash',
        triggerKey: 'a',
        source: 'sounds/drums/Crash A/Crash A 5.wav',
        volume: 0.55 * multiplier
    }, 
    {
        name: 'Ride',
        triggerKey: 's',
        source: 'sounds/drums/Ride Cymbal/Ride Cymbal 3.wav',
        volume: 0.85 * multiplier
    }, 
    {
        name: 'Hi-Hat Open',
        triggerKey: 'd',
        source: 'sounds/drums/Hi Hat/Hi Hat Open 5.wav',
        volume: 0.5 * multiplier,
        exclusiveZone: 2
    }, 
    {
        name: 'Kick',
        triggerKey: 'z',
        source: 'sounds/drums2/kick-softy.wav',
        volume: 0.855 * multiplier
    }, 
    {
        name: 'Snare',
        triggerKey: 'x',
        source: 'sounds/drums/Snare On/Snare 6.wav',
        volume: 0.85 * multiplier
    }, 
    {
        name: 'Hi-Hat Closed',
        triggerKey: 'c',
        source: 'sounds/drums/Hi Hat/Hi Hat 8.wav',
        volume: 0.7 * multiplier,
        exclusiveZone: 2
    }
]

export const synth = [
    {
        name: 'Synth C Major',
        triggerKey: 'r',
        source: 'sounds/synth/I_Do_Remember_C_01.wav',
        volume: 0.85,
        exclusiveZone: 3
    },
    {
        name: 'Synth D Major',
        triggerKey: 't',
        source: 'sounds/synth/I_Do_Remember_D_01.wav',
        volume: 0.85,
        exclusiveZone: 3
    },  
    {
        name: 'Synth E Major',
        triggerKey: 'y',
        source: 'sounds/synth/I_Do_Remember_E_01.wav',
        volume: 0.85,
        exclusiveZone: 3
    },  
    {
        name: 'Synth F Major',
        triggerKey: 'u',
        source: 'sounds/synth/I_Do_Remember_F_01.wav',
        volume: 0.85,
        exclusiveZone: 3
    },  
    {
        name: 'Synth G Major',
        triggerKey: 'i',
        source: 'sounds/synth/I_Do_Remember_G_01.wav',
        volume: 0.85,
        exclusiveZone: 3
    },
    {
        name: 'Synth A Major',
        triggerKey: 'o',
        source: 'sounds/synth/I_Do_Remember_A_01.wav',
        volume: 0.85,
        exclusiveZone: 3
    },
    {
        name: 'Synth B Major',
        triggerKey: 'p',
        source: 'sounds/synth/I_Do_Remember_B_01.wav',
        volume: 0.85,
        exclusiveZone: 3
    },
    {
        name: 'Piano Chord 1',
        triggerKey: 'f',
        source: 'sounds/piano/Chord_1.mp3',
        volume: 1.0,
        exclusiveZone: 1
    }, 
    {
        name: 'Piano Chord 2',
        triggerKey: 'g',
        source: 'sounds/piano/Chord_2.mp3',
        volume: 1.0,   
        exclusiveZone: 1
    }, 
    {
        name: 'Piano Chord 3',
        triggerKey: 'h',
        source: 'sounds/piano/Chord_3.mp3',
        volume: 1.0,
        exclusiveZone: 1
    }, 
]
