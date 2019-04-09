import { TOGGLE_INSTRUMENT_RECORD } from '../actions/types';
import instruments from '../config/instruments';

// Returns new activeKeys object based on provided instruments and their
// current armed status. If instrumentId is provided, only that instrument's
// values will be updated.
const getNewActiveKeys = (instruments, currentKeys = {}, instrumentId = null) => {
  let newKeys = { ...currentKeys };

  Object.values(instruments).forEach(instrument => {
    if (instrumentId && instrument.id !== instrumentId) { 
      return; 
    }

    instrument.sounds.forEach(({ triggerKey }) => {
      if (instrument.armed === false) {
        newKeys[triggerKey] = newKeys[triggerKey] ? 
          newKeys[triggerKey].filter(id => id !== instrumentId) :
          [];
      } else {
        newKeys[triggerKey] = [ 
          ...(newKeys[triggerKey] || []), 
          instrument.id 
        ];
      }
    });
  });

  return newKeys;
};

const initialState = {
  activeKeys: getNewActiveKeys(instruments),
  byId: instruments
}

export default (state = initialState, action) => {
  switch(action.type) {
    case TOGGLE_INSTRUMENT_RECORD:
      const newInstruments = { ...state.byId };
      const currentActiveKeys = { ...state.activeKeys };

      const targetInstrument = newInstruments[action.payload.instrumentId];
      targetInstrument.armed = !targetInstrument.armed;

      const newActiveKeys = getNewActiveKeys(
        newInstruments, 
        currentActiveKeys, 
        action.payload.instrumentId
      );

      return { byId: newInstruments, activeKeys: newActiveKeys };
      
    default:
      return state;
  }
}