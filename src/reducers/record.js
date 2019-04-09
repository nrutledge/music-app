import { KEY_PRESS, CLEAR_RECORDING } from '../actions/types';

const initialState = {
    playing: {},
    recording: {}
}

const record = (state = initialState, action) => {
    switch(action.type) {
        case KEY_PRESS:
            const { playIndex, key, isKeyUp, isRecordingOn, instruments } = action.payload;
            let newPlaying = { ...state.playing };
            let recording = state.recording; // Mutating original object for performance
            
            // Update currently playing keys/instruments
            instruments.forEach(instrumentId => {
              if (!newPlaying[instrumentId]) {
                newPlaying[instrumentId] = {};
              }

              const newPlayingInstrument = { ...newPlaying[instrumentId][key] };
              newPlayingInstrument[key] = isKeyUp ? false : true;
              newPlaying[instrumentId] = newPlayingInstrument;
            });
            

            // If recording is enabled, add key status to recording
            if (isRecordingOn) {
              instruments.forEach(instrumentId => {
                if (!recording[instrumentId]) {
                  recording[instrumentId] = {};
                }

                let newRecordingAtIndex = { ...recording[instrumentId][playIndex] };
                newRecordingAtIndex[key] = isKeyUp ? false : true;
                recording[instrumentId][playIndex] = newRecordingAtIndex;
              });
            }

            return {
                playing: newPlaying,
                recording: recording
            }     
        case CLEAR_RECORDING:
            return {
              playing: {},
              recording: {}
            }
        default:
            return state;
    }
}

export default record;