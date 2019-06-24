import instruments from '../config/instruments';
import { 
  TOGGLE_INSTRUMENT_PLAYBACK, 
  TOGGLE_INSTRUMENT_RECORD, 
  EDIT_INSTRUMENT,
  UPDATE_INSTRUMENT,
  UPDATE_INSTRUMENT_SOUND,
  CLOSE_EDIT_MODE
} from '../actions/types';

// TODO: Consider flattening data structure by moving sounds array into separate reducer

// TODO: Move to separate file / convert to model class
const makeSound = (triggerKey, source, name = '', volume = 1, detune = 0) => {
  return {
    id: (Math.random() * 1000000).toString(),
    name: name,
    triggerKey: triggerKey,
    source: source,
    volume: volume,
    detune: detune
  }
}

// Returns new activeKeys object based on provided instruments and their
// current armed status. If instrumentId is provided, only that instrument's
// values will be updated.
//
// Example activeKeys object: { Q: [5, 6], W: [7, 8, 9], ... }
//     This means key Q has instruments 5 and 6 active and W has 7, 8 and 9 active.
const getNewActiveKeys = (
  instruments, 
  currentKeys = {}, 
  instrumentId = null, 
  forceArmedStatus = false
) => {
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
      if (instrument.armed === true || forceArmedStatus === true) {
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
  editingInstrumentId: null,
  activeKeys: getNewActiveKeys(instruments),
  byId: instruments
}

export default (state = initialState, action) => {
  switch(action.type) {
    case TOGGLE_INSTRUMENT_PLAYBACK: {
      const newInstruments = { ...state.byId };
      const targetInstrument = newInstruments[action.payload.instrumentId];
      targetInstrument.muted = !targetInstrument.muted;

      return { ...state, activeKeys: state.activeKeys, byId: newInstruments };
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

      return { ...state, activeKeys: newActiveKeys, byId: newInstruments,  };
    }

    case EDIT_INSTRUMENT: {
      // Build temporary instruments object with all but the instrument
      // to be edited disabled
      const tempInstruments = { ...state.byId };
      for (let instrumentId in tempInstruments) {
        const newInstrument = { ...tempInstruments[instrumentId] };
        newInstrument.armed = instrumentId === action.payload.id ? true : false;
        tempInstruments[instrumentId] = newInstrument;
      }

      // Generate new active keys based on only the instrument to be edited
      // being active
      const newActiveKeys = getNewActiveKeys(
        tempInstruments, 
        { ...state.activeKeys }
      );

      // Preserve the instrument state for use after editing but set the new 
      // active keys
      return { ...state, editingInstrumentId: action.payload.id, activeKeys: newActiveKeys };
    }

    case UPDATE_INSTRUMENT: {
      const { instrumentId, settings } = action.payload;
      const newInstruments = { ...state.byId };
      newInstruments[instrumentId] = { 
        ...state.byId[instrumentId],
        ...settings
      }
      return {
        ...state,
        byId: newInstruments
      }
    }

    case UPDATE_INSTRUMENT_SOUND: {
      const { instrumentId, key, settings } = action.payload;
      const newSounds = [ ...state.byId[instrumentId].sounds ];

      const existingSoundIndex = state.byId[instrumentId].sounds.findIndex(
        sound => sound.triggerKey === key
      );

      if (existingSoundIndex !== -1) {
        newSounds[existingSoundIndex] = { 
          ...newSounds[existingSoundIndex],
          ...settings
        };
      } else if (settings.source) {
        // If sound doesn't exist for key, add it (but only if there is a source specified
        // since it is unplayable without the source)
        const newSound = makeSound(key, settings.source, settings.volume, settings.detune );
        newSounds.push(newSound);
      }

      const newInstruments = { 
        ...state.byId, 
        [instrumentId]: { 
          ...state.byId[instrumentId],
          sounds: newSounds
        } 
      }

      return { ...state, 
        activeKeys: getNewActiveKeys(newInstruments, state.activeKeys, instrumentId, true),
        byId: newInstruments
      }
    }

    case CLOSE_EDIT_MODE: {
      const newActiveKeys = getNewActiveKeys(
        state.byId, 
        { ...state.activeKeys }
      );

      // Preserve the instrument state for use after editing but set the new 
      // active keys
      return { ...state, editingInstrumentId: null, activeKeys: newActiveKeys };
    }

    default: {
      return state;
    }
  }
}