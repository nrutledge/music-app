const multiplier = 0.8;

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
        volume: 0.6 * multiplier
    }, 
    {
        name: 'Ride',
        triggerKey: 's',
        source: 'sounds/drums/Ride Cymbal/Ride Cymbal 3.wav',
        volume: 0.8 * multiplier
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
        volume: 1 * multiplier
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
        volume: 0.75,
        pan: 0.5,
        exclusiveZone: 3
    },
    {
        name: 'Synth D Major',
        triggerKey: 't',
        source: 'sounds/synth/I_Do_Remember_D_01.wav',
        volume: 0.75,
        pan: 0.5,
        exclusiveZone: 3
    },  
    {
        name: 'Synth E Major',
        triggerKey: 'y',
        source: 'sounds/synth/I_Do_Remember_E_01.wav',
        volume: 0.75,
        pan: 0.5,
        exclusiveZone: 3
    },  
    {
        name: 'Synth F Major',
        triggerKey: 'u',
        source: 'sounds/synth/I_Do_Remember_F_01.wav',
        volume: 0.75,
        pan: 0.5,
        exclusiveZone: 3,
        detune: 100
    },  
    {
        name: 'Synth G Major',
        triggerKey: 'i',
        source: 'sounds/synth/I_Do_Remember_G_01.wav',
        volume: 0.75,
        pan: 0.5,
        exclusiveZone: 3
    },
    {
        name: 'Synth A Major',
        triggerKey: 'o',
        source: 'sounds/synth/I_Do_Remember_A_01.wav',
        volume: 0.75,
        pan: 0.5,
        exclusiveZone: 3
    },
    {
        name: 'Synth B Major',
        triggerKey: 'p',
        source: 'sounds/synth/I_Do_Remember_B_01.wav',
        volume: 0.75,
        pan: 0.5,
        exclusiveZone: 3
    },
]

export const piano = [
    {
        name: 'Piano Chord 1',
        triggerKey: 'f',
        source: 'sounds/piano/Chord_1.mp3',
        volume: 1.0,
        pan: -0.5,
        exclusiveZone: 1
    }, 
    {
        name: 'Piano Chord 2',
        triggerKey: 'g',
        source: 'sounds/piano/Chord_2.mp3',
        volume: 1.0,
        pan: -0.5,   
        exclusiveZone: 1
    }, 
    {
        name: 'Piano Chord 3',
        triggerKey: 'h',
        source: 'sounds/piano/Chord_3.mp3',
        volume: 1.0,
        pan: -0.5,
        exclusiveZone: 1
    }, 
    {
        name: 'Piano Chord 4',
        triggerKey: 'j',
        source: 'sounds/piano/Chord_3.mp3',
        volume: 1.0,
        pan: -0.5,
        exclusiveZone: 1,
        detune: 200
    }, 
    {
        name: 'Piano Chord 5',
        triggerKey: 'k',
        source: 'sounds/piano/Chord_3.mp3',
        volume: 1.0,
        pan: -0.5,
        exclusiveZone: 1,
        detune: 300
    },
    {
        name: 'Piano Chord 6',
        triggerKey: 'l',
        source: 'sounds/piano/Chord_3.mp3',
        volume: 1.0,
        pan: -0.5,
        exclusiveZone: 1,
        detune: 500
    },
    {
        name: 'Piano Chord 7',
        triggerKey: ';',
        source: 'sounds/piano/Chord_3.mp3',
        volume: 1.0,
        pan: -0.5,
        exclusiveZone: 1,
        detune: 700
    },
]