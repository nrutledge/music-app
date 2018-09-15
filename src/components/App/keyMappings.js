const multiplier = 0.8;

export const keyMappings = [
    {
        name: 'Piano Chord 1',
        triggerKey: 'r',
        sound: 'sounds/piano/Chord_1.mp3',
        volume: 1.0,
    }, 
    {
        name: 'Piano Chord 2',
        triggerKey: 't',
        sound: 'sounds/piano/Chord_2.mp3',
        volume: 1.0,        
    }, 
    {
        name: 'Piano Chord 3',
        triggerKey: 'y',
        sound: 'sounds/piano/Chord_3.mp3',
        volume: 1.0
    }, 
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
        isHiHat: true
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
        isHiHat: true
    }
]
