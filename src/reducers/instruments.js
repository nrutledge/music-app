import instruments from '../config/instruments';
import { 
  TOGGLE_INSTRUMENT_PLAYBACK, 
  TOGGLE_INSTRUMENT_RECORD, 
  EDIT_INSTRUMENT
} from '../actions/types';

// Returns new activeKeys object based on provided instruments and their
// current armed status. If instrumentId is provided, only that instrument's
// values will be updated.
//
// Example activeKeys object: { Q: [5, 6], W: [7, 8, 9], ... }
//     This means key Q has instruments 5 and 6 active and W has 7, 8 and 9 active.
const getNewActiveKeys = (instruments, currentKeys = {}, instrumentId = null) => {
  let newKeys = { ...currentKeys };

  Object.values(instruments).forEach(instrument => {
    if (instrumentId && instrument.id !== instrumentId) { 
      return; 
    }

    instrument.sounds.forEach(({ triggerKey }) => {
      // Remove any current instrument references for trigger key.
      // This will prevent any already armed instruments from getting added twice
      newKeys[triggerKey] = newKeys[triggerKey] ? 
        newKeys[triggerKey].filter(id => id !== instrument.id) :
        [];
        
      // Add back reference only if instrument is armed 
      if (instrument.armed === true) {
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
    case TOGGLE_INSTRUMENT_PLAYBACK: {
      const newInstruments = { ...state.byId };
      const targetInstrument = newInstruments[action.payload.instrumentId];
      targetInstrument.muted = !targetInstrument.muted;

      return { byId: newInstruments, activeKeys: state.activeKeys };
    }

    case TOGGLE_INSTRUMENT_RECORD: {
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
    }

    case EDIT_INSTRUMENT: {
      // Build temporary instruments object with all but the instrument
      // to be edited disabled
      const tempInstruments = { ...state.byId };
      for (let instrumentId in tempInstruments) {
        const newInstrument = { ...tempInstruments[instrumentId] };
        newInstrument.armed = instrumentId == action.payload.id ? true : false;
        tempInstruments[instrumentId] = newInstrument;
      }

      console.log({ tempInstruments });
      // Generate new active keys based on only the instrument to be edited
      // being active
      const newActiveKeys = getNewActiveKeys(
        tempInstruments, 
        { ...state.activeKeys }
      );

      console.log({ newActiveKeys })

      // Preserve the instrument state for use after editing but set the new 
      // active keys
      return { ...state, byId: { ...state.byId }, activeKeys: newActiveKeys };
    }

    default: {
      return state;
    }
  }
}