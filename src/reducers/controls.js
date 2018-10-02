import { TIMER_TICK, TIMER_RESTART, TOGGLE_RECORD } from '../actions/types';

const initialState = {
    playIndex: 0,
    status: 'stopped',
    isRecordingOn: false
}

const controls = (state = initialState, action) => {
    switch(action.type) {
        case TIMER_TICK:
            return {
                ...state,
                playIndex: state.playIndex + 1
            }
        case TIMER_RESTART:
            return {
                ...state,
                playIndex: 0
            }
        case TOGGLE_RECORD:
            const newIsRecordingOn = state.isRecordingOn ? false : true;
            console.log('recordingOn', newIsRecordingOn)
            return {
                ...state,
                isRecordingOn: newIsRecordingOn
            }
        default:
            return state;
    }
}

export default controls;