import { 
    TIMER_START, 
    TIMER_TICK, 
    TIMER_STOP, 
    TIMER_RESTART, 
    KEY_PRESS, 
    TEMPO_CHANGE, 
    TOGGLE_RECORD,
    CLEAR_RECORDING,
    TOGGLE_INSTRUMENT_RECORD,
    TOGGLE_KEY_RESET
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

export const toggleInstrumentRecord = (instrumentId) => {
  return { type: TOGGLE_INSTRUMENT_RECORD, payload: { instrumentId } };
}

export const toggleKeyReset = () => ({ type: TOGGLE_KEY_RESET });

export const timerStop = () => dispatch => {
    clearInterval(timer);
    timer = null;

    dispatch({ type: TOGGLE_KEY_RESET });
    dispatch({ type: TIMER_STOP });
}

export const timerRestart = () => dispatch => {
    dispatch({ type: TOGGLE_KEY_RESET });
    dispatch({ type: TIMER_RESTART });
}

export const clearRecording = instrumentId => dispatch => {
    dispatch({ type: CLEAR_RECORDING, payload: { instrumentId } });
}

