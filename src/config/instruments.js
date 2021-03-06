const baseHue = 0;
const spread = 72;

export default {
  0: {
    id: '0',
    name: 'Rock Drums (ง\'̀-\'́)ง',
    hue: baseHue,
    volume: 55,
    panning: 0,
    reverb: 5,
    stopDelay: 2,
    decayTime: 4,
    transitionTime: 0.005,
    armed: true,
    sounds: [
      {
          id: '0',
          name: 'High Tom',
          triggerKey: 'q',
          source: 'sounds/drums/Tom High/Tom High 4.mp3',
          volume: 0.8,
          detune: 0
      }, 
      {
          id: '1',
          name: 'Mid Tom',
          triggerKey: 'w',
          source: 'sounds/drums/Tom Mid/Tom Mid 4.mp3',
          volume: 0.8,
          detune: 0
      }, 
      {
          id: '2',
          name: 'Floor Tom',
          triggerKey: 'e',
          source: 'sounds/drums/Tom Floor/Tom Floor 5.mp3',
          volume: 0.8,
          detune: 0
      }, 
      {
          id: '3',
          name: 'Crash',
          triggerKey: 'a',
          source: 'sounds/drums/Crash A/Crash A 5.mp3',
          volume: 0.5,
          detune: 0
      }, 
      {
          id: '4',
          name: 'Ride',
          triggerKey: 's',
          source: 'sounds/drums/Ride Cymbal/Ride Cymbal 3.mp3',
          volume: 0.8,
          detune: 0
      }, 
      {
          id: '5',
          name: 'Hi-Hat Open',
          triggerKey: 'd',
          source: 'sounds/drums/Hi Hat/Hi Hat Open 5.mp3',
          volume: 0.45,
          detune: 0,
          exclusiveZone: 2
      }, 
      {
          id: '6',
          name: 'Kick',
          triggerKey: 'z',
          source: 'sounds/drums2/kick-softy.mp3',
          volume: 0.95,
          detune: 0
      }, 
      {
          id: '7',
          name: 'Snare',
          triggerKey: 'x',
          source: 'sounds/drums/Snare On/Snare 6.mp3',
          volume: 0.7,
          detune: 0
      }, 
      {
          id: '8',
          name: 'Hi-Hat Closed',
          triggerKey: 'c',
          source: 'sounds/drums/Hi Hat/Hi Hat 8.mp3',
          volume: 0.7,
          detune: 0,
          exclusiveZone: 2
      },
    ]
  },
  1: {
    id: '1',
    name: 'Synth Drums', 
    hue: baseHue + (spread * 1),
    volume: 40, 
    panning: 0, 
    reverb: 10,
    stopDelay: 0.02,
    decayTime: 0.3,
    transitionTime: 0.005,
    armed: true,
    sounds: [
      {
          id: '0',
          name: '808 C',
          triggerKey: 'v',
          source: 'sounds/drums2/808-bass-f-raw_Fsharp.wav',
          volume: 1.0,
          detune: -600,
          //exclusiveZone: 6
      }, 
      {
          id: '1',
          name: '808 D',
          triggerKey: 'b',
          source: 'sounds/drums2/808-bass-f-raw_Fsharp.wav',
          volume: 1.0,
          detune: -400,
          //exclusiveZone: 6
      }, 
      {
          id: '2',
          name: '808 E',
          triggerKey: 'n',
          source: 'sounds/drums2/808-bass-f-raw_Fsharp.wav',
          volume: 1.0,
          detune: -200,
          //exclusiveZone: 6
      }, {
          id: '3',
          name: '808 F#',
          triggerKey: 'm',
          source: 'sounds/drums2/808-bass-f-raw_Fsharp.wav',
          volume: 1.0,
          detune: 0,
          //exclusiveZone: 6
      }, {
          id: '4',
          name: '808 G',
          triggerKey: ',',
          source: 'sounds/drums2/808-bass-f-raw_Fsharp.wav',
          volume: 0.97,
          detune: 100,
          //exclusiveZone: 6
      }, {
          id: '5',
          name: '808 A',
          triggerKey: '.',
          source: 'sounds/drums2/808-bass-f-raw_Fsharp.wav',
          volume: 0.93,
          detune: 300,
          //exclusiveZone: 6
      }, {
          id: '6',
          name: '808 B',
          triggerKey: '/',
          source: 'sounds/drums2/808-bass-f-raw_Fsharp.wav',
          volume: 0.9,
          detune: 500,
          //exclusiveZone: 6
      }
    ]
  },
  2: {
    id: '2',
    keyMapping: 'piano', 
    name: 'Piano', 
    hue: baseHue + (spread * 2),
    volume: 55, 
    panning: -12, 
    reverb: 30,
    stopDelay: 0.01,
    decayTime: 0.4,
    transitionTime: 0.005,
    armed: true,
    sounds: [
      {
          id: '0',
          name: 'Piano Chord 1',
          triggerKey: 'f',
          source: 'sounds/piano/Chord_1.mp3',
          volume: 1.0,
          detune: 0
          //exclusiveZone: 1
      }, 
      {
          id: '1',
          name: 'Piano Chord 2',
          triggerKey: 'g',
          source: 'sounds/piano/Chord_2.mp3',
          volume: 1.0,
          detune: 0   
          //exclusiveZone: 1
      }, 
      {
          id: '2',
          name: 'Piano Chord 3',
          triggerKey: 'h',
          source: 'sounds/piano/Chord_3.mp3',
          volume: 1.0,
          detune: 0
          //exclusiveZone: 1
      }, 
      {
          id: '3',
          name: 'Piano Chord 4',
          triggerKey: 'j',
          source: 'sounds/piano/Chord_3.mp3',
          volume: 1.0,
          detune: 200
          //exclusiveZone: 1,
      }, 
      {
          id: '4',
          name: 'Piano Chord 5',
          triggerKey: 'k',
          source: 'sounds/piano/Chord_3.mp3',
          volume: 1.0,
          detune: 300
          //exclusiveZone: 1,
      },
      {
          id: '5',
          name: 'Piano Chord 6',
          triggerKey: 'l',
          source: 'sounds/piano/Chord_3.mp3',
          volume: 1.0,
          detune: 500
          //exclusiveZone: 1,
      },
      {
          id: '6',
          name: 'Piano Chord 7',
          triggerKey: ';',
          source: 'sounds/piano/Chord_3.mp3',
          volume: 0.95,
          detune: 700
          //exclusiveZone: 1,
      },
      {
          id: '7',
          name: 'Piano Chord 8',
          triggerKey: '\'',
          source: 'sounds/piano/Chord_3.mp3',
          volume: 0.9,
          detune: 800
          //exclusiveZone: 1,
      }
    ]
  },
  3: {
    id: '3',
    name: 'Synth', 
    hue: baseHue + (spread * 3),
    volume: 50, 
    panning: 12, 
    reverb: 20,
    stopDelay: 0.01,
    decayTime: 0.3,
    transitionTime: 0.005,
    armed: true,
    sounds: [
      {
          id: '0',
          name: 'Synth C Major',
          triggerKey: 'r',
          source: 'sounds/synth/I_Do_Remember_C_01.wav',
          volume: 0.75,
          detune: 0
          //exclusiveZone: 3
      },
      {
          id: '1',
          name: 'Synth D Major',
          triggerKey: 't',
          source: 'sounds/synth/I_Do_Remember_D_01.wav',
          volume: 0.75,
          detune: 0
          //exclusiveZone: 3
      },  
      {
          id: '2',
          name: 'Synth E Major',
          triggerKey: 'y',
          source: 'sounds/synth/I_Do_Remember_E_01.wav',
          volume: 0.75,
          detune: 0
          //exclusiveZone: 3
      },  
      {
          id: '3',
          name: 'Synth F# Major',
          triggerKey: 'u',
          source: 'sounds/synth/I_Do_Remember_F_01.wav',
          volume: 0.75,
          detune: 100
          //exclusiveZone: 3,
      },  
      {
          id: '4',
          name: 'Synth G Major',
          triggerKey: 'i',
          source: 'sounds/synth/I_Do_Remember_G_01.wav',
          volume: 0.75,
          detune: 0
          //exclusiveZone: 3
      },
      {
          id: '5',
          name: 'Synth A Major',
          triggerKey: 'o',
          source: 'sounds/synth/I_Do_Remember_A_01.wav',
          volume: 0.75,
          detune: 0
          //exclusiveZone: 3
      },
      {
          id: '6',
          name: 'Synth B Major',
          triggerKey: 'p',
          source: 'sounds/synth/I_Do_Remember_B_01.wav',
          volume: 0.75,
          detune: 0
          //exclusiveZone: 3
      },
      {
        id: '7',
        name: 'Synth C Major',
        triggerKey: '[',
        source: 'sounds/synth/I_Do_Remember_B_01.wav',
        volume: 0.75,
        detune: 100
        //exclusiveZone: 3
    },
    {
      id: '8',
      name: 'Synth D Major',
      triggerKey: ']',
      source: 'sounds/synth/I_Do_Remember_B_01.wav',
      volume: 0.75,
      detune: 300
      //exclusiveZone: 3
  }
    ]
  },
  4: {
    id: '4',
    name: 'Cello Low', 
    hue: baseHue + (spread * 4),
    volume: 20, 
    panning: -25, 
    reverb: 30,
    stopDelay: 0.025,
    decayTime: 0.3,
    transitionTime: 0.005,
    armed: true,
    sounds: [
      {
          id: '0',
          name: 'Cello G',
          triggerKey: '1',
          source: 'sounds/strings/cello_G_major.wav',
          volume: 1.0,
          detune: -1200
      }, 
      {
          id: '1',
          name: 'Cello A',
          triggerKey: '2',
          source: 'sounds/strings/cello_G_major.wav',
          volume: 0.97,
          detune: -1000
      }, 
      {
          id: '2',
          name: 'Cello B',
          triggerKey: '3',
          source: 'sounds/strings/cello_G_major.wav',
          volume: 0.94,
          detune: -800
      }, 
      {
          id: '3',
          name: 'Cello C',
          triggerKey: '4',
          source: 'sounds/strings/cello_G_major.wav',
          volume: 0.91,
          detune: -700
      }, 
      {
          id: '4',
          name: 'Cello D',
          triggerKey: '5',
          source: 'sounds/strings/cello_G_major.wav',
          volume: 0.88,
          detune: -500
      }, 
      {
          id: '5',
          name: 'Cello E',
          triggerKey: '6',
          source: 'sounds/strings/cello_G_major.wav',
          volume: 0.85,
          detune: -300
      }, 
      {
          id: '6',
          name: 'Cello F#',
          triggerKey: '7',
          source: 'sounds/strings/cello_G_major.wav',
          volume: 0.82,
          detune: -100
      }, 
      {
          id: '7',
          name: 'Cello G',
          triggerKey: '8',
          source: 'sounds/strings/cello_G_major.wav',
          volume: 0.79,
          detune: 0
      }, 
      {
          id: '8',
          name: 'Cello A',
          triggerKey: '9',
          source: 'sounds/strings/cello_G_major.wav',
          volume: 0.76,
          detune: 200
      }, 
      {
          id: '9',
          name: 'Cello B',
          triggerKey: '0',
          source: 'sounds/strings/cello_G_major.wav',
          volume: 0.74,
          detune: 400
      }, 
      {
          id: '10',
          name: 'Cello C',
          triggerKey: '-',
          source: 'sounds/strings/cello_G_major.wav',
          volume: 0.71,
          detune: 500
      }, 
      {
          id: '11',
          name: 'Cello D',
          triggerKey: '=',
          source: 'sounds/strings/cello_G_major.wav',
          volume: 0.68,
          detune: 700
      }
    ]
  },
  5: {
    id: '5',
    name: 'Cello High', 
    hue: baseHue + (spread * 4),
    volume: 20, 
    panning: 25, 
    reverb: 40,
    stopDelay: 0.025,
    decayTime: 0.3,
    transitionTime: 0.005,
    armed: true,
    sounds: [
      {
          id: '0',
          name: 'Cello G',
          triggerKey: '1',
          source: 'sounds/strings/cello_G_major.wav',
          volume: 1.0,
          detune: 0
      }, 
      {
          id: '1',
          name: 'Cello A',
          triggerKey: '2',
          source: 'sounds/strings/cello_G_major.wav',
          volume: 0.97,
          detune: 200
      }, 
      {
          id: '2',
          name: 'Cello B',
          triggerKey: '3',
          source: 'sounds/strings/cello_G_major.wav',
          volume: 0.94,
          detune: 400
      }, 
      {
          id: '3',
          name: 'Cello C',
          triggerKey: '4',
          source: 'sounds/strings/cello_G_major.wav',
          volume: 0.91,
          detune: 500
      }, 
      {
          id: '4',
          name: 'Cello D',
          triggerKey: '5',
          source: 'sounds/strings/cello_G_major.wav',
          volume: 0.88,
          detune: 700
      }, 
      {
          id: '5',
          name: 'Cello E',
          triggerKey: '6',
          source: 'sounds/strings/cello_G_major.wav',
          volume: 0.85,
          detune: 900
      }, 
      {
          id: '6',
          name: 'Cello F#',
          triggerKey: '7',
          source: 'sounds/strings/cello_G_major.wav',
          volume: 0.82,
          detune: 1100
      }, 
      {
          id: '7',
          name: 'Cello G',
          triggerKey: '8',
          source: 'sounds/strings/cello_G_major.wav',
          volume: 0.79,
          detune: 1200
      }, 
      {
          id: '8',
          name: 'Cello A',
          triggerKey: '9',
          source: 'sounds/strings/cello_G_major.wav',
          volume: 0.76,
          detune: 1400
      }, 
      {
          id: '9',
          name: 'Cello B',
          triggerKey: '0',
          source: 'sounds/strings/cello_G_major.wav',
          volume: 0.74,
          detune: 1600
      }, 
      {
          id: '10',
          name: 'Cello C',
          triggerKey: '-',
          source: 'sounds/strings/cello_G_major.wav',
          volume: 0.71,
          detune: 1700
      }, 
      {
          id: '11',
          name: 'Cello D',
          triggerKey: '=',
          source: 'sounds/strings/cello_G_major.wav',
          volume: 0.68,
          detune: 1900
      }
    ]
  }
}













