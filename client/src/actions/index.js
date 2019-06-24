import React from 'react';
import KeySettingsForm from '../components/KeySettingsForm/KeySettingsForm';
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
    TOGGLE_INSTRUMENT_PLAYBACK,
    KEY_RESET_COMPLETED,
    EDIT_INSTRUMENT,
    UPDATE_INSTRUMENT,
    UPDATE_INSTRUMENT_SOUND,
    CLOSE_EDIT_MODE,
    EDIT_KEY_SETTINGS,
    CLOSE_MODAL
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

export const toggleInstrumentPlayback = (instrumentId) => {
  return { type: TOGGLE_INSTRUMENT_PLAYBACK, payload: { instrumentId } };
}

export const toggleInstrumentRecord = (instrumentId) => {
  return { type: TOGGLE_INSTRUMENT_RECORD, payload: { instrumentId } };
}

export const keyResetCompleted = () => ({ type: KEY_RESET_COMPLETED });

export const timerStop = () => {
    clearInterval(timer);
    timer = null;

    return { type: TIMER_STOP };
}

export const timerRestart = () => {
    return { type: TIMER_RESTART };
}

export const clearRecording = instrumentId => dispatch => {
    // Stop timer only if entire recording was cleared
    if (!instrumentId) {
      clearInterval(timer);
      timer = null;
      dispatch({ type: TIMER_STOP });
      dispatch({ type: TIMER_RESTART });
    }

    dispatch({ type: CLEAR_RECORDING, payload: { instrumentId } });
}

export const editInstrument = instrumentId => (dispatch, getState) => {
  const instrument = getState().instruments.byId[instrumentId];

  dispatch({ type: EDIT_INSTRUMENT, payload: instrument });
}

// settings is an object that will be merged into the instrument
export const updateInstrument = (instrumentId, settings) => {
  return { type: UPDATE_INSTRUMENT, payload: { instrumentId, settings }};
};

// settings is an object that will be merged into the sound object
export const updateInstrumentSound = (instrumentId, key, settings) => {
  return { type: UPDATE_INSTRUMENT_SOUND, payload: { instrumentId, key, settings }};
};

export const closeEditMode = () => {
  return { type: CLOSE_EDIT_MODE };
}

export const editKeySettings = (key, instrumentId) => {
  const title = `Settings for Key: ${key.toUpperCase()}`
  const renderProp = () => {
    return (
      <KeySettingsForm keyName={key} instrumentId={instrumentId} />
    );
  }

  return { type: EDIT_KEY_SETTINGS, payload: { title, renderProp } };
}

export const closeModal = () => {
  return { type: CLOSE_MODAL };
}