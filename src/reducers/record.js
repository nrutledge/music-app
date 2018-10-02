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
            let newRecording = [ ...state.recording];
            
            // Update currently playing keys
            newPlaying[key] = isKeyUp ? false : true;

            // If recording is enabled, add key status to recording
            // 'd' = keydown, 'u' = keyup
            if (isRecordingOn) {
                let newRecordingAtIndex = { ...newRecording[playIndex] };
                newRecordingAtIndex[key] = isKeyUp ? 'u' : 'd';
                newRecording[playIndex] = newRecordingAtIndex;
            }
            
            return {
                playing: newPlaying,
                recording: newRecording
            }
        case CLEAR_RECORDING:
            return initialState;
        default:
            return state;
    }
}

export default record;