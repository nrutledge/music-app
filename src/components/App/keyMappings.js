const multiplier = 0.8;

export const keyMappings = [
   {
        triggerKey: 'r',
        hardSound: 'sounds/piano/Chord_1.mp3',
        hardVolume: 1.0,
        softSound: 'sounds/piano/Chord_1.mp3',
        softVolume: 0.8,
        type: 'Paino Chord 1'
    }, {
        triggerKey: 't',
        hardSound: 'sounds/piano/Chord_2.mp3',
        hardVolume: 1.0,
        softSound: 'sounds/piano/Chord_2.mp3',
        softVolume: 0.8,
        type: 'Piano Chord 2'
    }, {
        triggerKey: 'y',
        hardSound: 'sounds/piano/Chord_3.mp3',
        hardVolume: 1.0,
        softSound: 'sounds/piano/Chord_3.mp3',
        softVolume: 0.8,
        type: 'Piano Chord 3'
    }, {
        triggerKey: 'q',
        hardSound: 'sounds/drums/Tom High/Tom High 4.wav',
        hardVolume: 1.0 * multiplier,
        softSound: 'sounds/drums/Tom High/Tom High 3.wav',
        softVolume: 1.0 * multiplier,
        type: 'High Tom',
    }, {
        triggerKey: 'w',
        hardSound: 'sounds/drums/Tom Mid/Tom Mid 4.wav',
        hardVolume: 1.0 * multiplier,
        softSound: 'sounds/drums/Tom Mid/Tom Mid 5.wav',
        softVolume: 1.0 * multiplier,
        type: 'Mid Tom'
    }, {
        triggerKey: 'e',
        hardSound: 'sounds/drums/Tom Floor/Tom Floor 5.wav',
        hardVolume: 1.0 * multiplier,
        softSound: 'sounds/drums/Tom Floor/Tom Floor 4.wav',
        softVolume: 1.0 * multiplier,
        type: 'Floor Tom'
    }, {
        triggerKey: 'a',
        hardSound: 'sounds/drums/Crash A/Crash A 5.wav',
        hardVolume: 0.65 * multiplier,
        softSound: 'sounds/drums/Crash A/Crash A 5.wav',
        softVolume: 0.55 * multiplier,
        type: 'Crash'
    }, {
        triggerKey: 's',
        hardSound: 'sounds/drums/Ride Cymbal/Ride Cymbal 3.wav',
        hardVolume: 0.9 * multiplier,
        softSound: 'sounds/drums/Ride Cymbal/Ride Cymbal 3.wav',
        softVolume: 0.7 * multiplier,
        type: 'Ride'
    }, {
        triggerKey: 'd',
        hardSound: 'sounds/drums/Hi Hat/Hi Hat Open 5.wav',
        hardVolume: 0.55 * multiplier,
        softSound: 'sounds/drums/Hi Hat/Hi Hat Open 4.wav',
        softVolume: 1.0 * multiplier,
        type: 'Hi-Hat Open',
        isHiHat: true
    }, {
        triggerKey: 'z',
        hardSound: 'sounds/drums2/kick-softy.wav',
        hardVolume: 0.85 * multiplier,
        softSound: 'sounds/drums2/kick-softy.wav',
        softVolume: 0.7 * multiplier,
        type: 'Kick'
    }, {
        triggerKey: 'x',
        hardSound: 'sounds/drums/Snare On/Snare 6.wav',
        hardVolume: 0.9 * multiplier,
        softSound: 'sounds/drums/Snare On/Snare 5.wav',
        softVolume: 0.95 * multiplier,
        type: 'Snare'
    }, {
        triggerKey: 'c',
        hardSound: 'sounds/drums/Hi Hat/Hi Hat 8.wav',
        hardVolume: 0.7 * multiplier,
        softSound: 'sounds/drums/Hi Hat/Hi Hat 7.wav',
        softVolume: 0.85 * multiplier,
        type: 'Hi-Hat Closed',
        isHiHat: true
    }
]
