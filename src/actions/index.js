import { 
    TIMER_START, 
    TIMER_TICK, 
    TIMER_STOP, 
    TIMER_RESTART, 
    KEY_PRESS, 
    TEMPO_CHANGE, 
    TOGGLE_RECORD,
    CLEAR_RECORDING
} from './types';

let timer = null;

export const timerStart = (interval) => {
    return (dispatch) => {
        // Don't start if no interval or timer is already running
        if (!interval || timer) { return; }

        timer = setInterval(() => dispatch(timerTick()), interval);
        dispatch({ type: TIMER_START });
    };
}

export const timerTick = () => {
    return { type: TIMER_TICK };
}

export const timerStop = () => {
    clearInterval(timer);
    timer = null;
    return { type: TIMER_STOP };
}

export const timerRestart = () => {
    return { type: TIMER_RESTART };
}

export const keyPress = (key, isKeyUp, isPlayBack) => {
    return (dispatch, getState) => {
        const { playIndex, isRecordingOn } = getState().controls;
        dispatch({
            type: KEY_PRESS,
            payload: { key, isKeyUp, isPlayBack, playIndex, isRecordingOn }
        });
    }
}

export const tempoChange = (tempo) => {
    return { type: TEMPO_CHANGE, payload: { tempo } };
};

export const toggleRecord = () => {
    return { type: TOGGLE_RECORD };
};

export const clearRecording = () => {
    return { type: CLEAR_RECORDING };
}