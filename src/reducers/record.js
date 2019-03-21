import { KEY_PRESS, CLEAR_RECORDING } from '../actions/types';

const initialState = {
    playing: {},
    recording: []
}

const record = (state = initialState, action) => {
    switch(action.type) {
        case KEY_PRESS:
            const { playIndex, key, isKeyUp, isRecordingOn } = action.payload;
            let newPlaying = { ...state.playing };
            let recording = state.recording; // Mutating original array for performance
            
            // Update currently playing keys
            newPlaying[key] = isKeyUp ? false : true;

            // If recording is enabled, add key status to recording
            // 'd' = keydown, 'u' = keyup
            if (isRecordingOn) {
                let newRecordingAtIndex = { ...recording[playIndex] };
                newRecordingAtIndex[key] = isKeyUp ? 'u' : 'd';
                recording[playIndex] = newRecordingAtIndex;
            }
            
            return {
                playing: newPlaying,
                recording: recording
            }
        case CLEAR_RECORDING:
            return {
              playing: {},
              recording: []
            }
        default:
            return state;
    }
}

export default record;