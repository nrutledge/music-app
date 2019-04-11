import { 
    TIMER_START, 
    TIMER_TICK, 
    TIMER_STOP, 
    TIMER_RESTART, 
    KEY_PRESS, 
    TEMPO_CHANGE, 
    TOGGLE_RECORD,
    CLEAR_RECORDING,
    TOGGLE_INSTRUMENT_RECORD
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

export const keyPress = (key, isKeyUp) => {
    return (dispatch, getState) => {
        const { playIndex, isRecordingOn } = getState().controls;
        const { activeKeys } = getState().instruments;

        if (!activeKeys[key] || (activeKeys[key] && activeKeys[key].length === 0)) {
          return;
        }

        dispatch({
            type: KEY_PRESS,
            payload: { key, isKeyUp, playIndex, isRecordingOn, instruments: activeKeys[key] }
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

export const toggleInstrumentRecord = (instrumentId) => {
  return { type: TOGGLE_INSTRUMENT_RECORD, payload: { instrumentId } };
}