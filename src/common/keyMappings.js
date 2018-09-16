const multiplier = 0.8;

export const drums = [
    {
        name: 'High Tom',
        triggerKey: 'q',
        sound: 'sounds/drums/Tom High/Tom High 4.wav',
        volume: 1.0 * multiplier,
    }, 
    {
        name: 'Mid Tom',
        triggerKey: 'w',
        sound: 'sounds/drums/Tom Mid/Tom Mid 4.wav',
        volume: 1.0 * multiplier
    }, 
    {
        name: 'Floor Tom',
        triggerKey: 'e',
        sound: 'sounds/drums/Tom Floor/Tom Floor 5.wav',
        volume: 1.0 * multiplier
    }, 
    {
        name: 'Crash',
        triggerKey: 'a',
        sound: 'sounds/drums/Crash A/Crash A 5.wav',
        volume: 0.55 * multiplier
    }, 
    {
        name: 'Ride',
        triggerKey: 's',
        sound: 'sounds/drums/Ride Cymbal/Ride Cymbal 3.wav',
        volume: 0.8 * multiplier
    }, 
    {
        name: 'Hi-Hat Open',
        triggerKey: 'd',
        sound: 'sounds/drums/Hi Hat/Hi Hat Open 5.wav',
        volume: 0.5 * multiplier,
        exclusiveZone: 2
    }, 
    {
        name: 'Kick',
        triggerKey: 'z',
        sound: 'sounds/drums2/kick-softy.wav',
        volume: 0.85 * multiplier
    }, 
    {
        name: 'Snare',
        triggerKey: 'x',
        sound: 'sounds/drums/Snare On/Snare 6.wav',
        volume: 0.8 * multiplier
    }, 
    {
        name: 'Hi-Hat Closed',
        triggerKey: 'c',
        sound: 'sounds/drums/Hi Hat/Hi Hat 8.wav',
        volume: 0.7 * multiplier,
        exclusiveZone: 2
    }
]

export const synth = [
    {
        name: 'Synth C Major',
        triggerKey: 'r',
        sound: 'sounds/synth/I_Do_Remember_C_01.wav',
        volume: 0.75,
        exclusiveZone: 3
    },
    {
        name: 'Synth D Major',
        triggerKey: 't',
        sound: 'sounds/synth/I_Do_Remember_D_01.wav',
        volume: 0.75,
        exclusiveZone: 3
    },  
    {
        name: 'Synth E Major',
        triggerKey: 'y',
        sound: 'sounds/synth/I_Do_Remember_E_01.wav',
        volume: 0.75,
        exclusiveZone: 3
    },  
    {
        name: 'Synth F Major',
        triggerKey: 'u',
        sound: 'sounds/synth/I_Do_Remember_F_01.wav',
        volume: 0.75,
        exclusiveZone: 3
    },  
    {
        name: 'Synth G Major',
        triggerKey: 'i',
        sound: 'sounds/synth/I_Do_Remember_G_01.wav',
        volume: 0.75,
        exclusiveZone: 3
    },
    {
        name: 'Synth A Major',
        triggerKey: 'o',
        sound: 'sounds/synth/I_Do_Remember_A_01.wav',
        volume: 0.75,
        exclusiveZone: 3
    },
    {
        name: 'Synth B Major',
        triggerKey: 'p',
        sound: 'sounds/synth/I_Do_Remember_B_01.wav',
        volume: 0.75,
        exclusiveZone: 3
    },
    {
        name: 'Piano Chord 1',
        triggerKey: 'f',
        sound: 'sounds/piano/Chord_1.mp3',
        volume: 1.0,
        exclusiveZone: 1
    }, 
    {
        name: 'Piano Chord 2',
        triggerKey: 'g',
        sound: 'sounds/piano/Chord_2.mp3',
        volume: 1.0,   
        exclusiveZone: 1
    }, 
    {
        name: 'Piano Chord 3',
        triggerKey: 'h',
        sound: 'sounds/piano/Chord_3.mp3',
        volume: 1.0,
        exclusiveZone: 1
    }, 
]
