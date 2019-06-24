import { 
  TIMER_TICK, 
  TIMER_START, 
  TIMER_STOP, 
  TIMER_RESTART, 
  TOGGLE_RECORD, 
  TEMPO_CHANGE, 
  CLEAR_RECORDING 
} from '../actions/types';

const initialState = {
  playIndex: 0,
  isPlaying: false,
  isRecordingOn: false,
  tempo: 100
}

export default (state = initialState, action) => {
  switch(action.type) {
    case TIMER_START: {
      return { ...state, isPlaying: true };
    }

    case TIMER_TICK: {
      return { ...state, playIndex: state.playIndex + 1 };
    }

    case TIMER_RESTART: {
      return { ...state, playIndex: 0 };
    }

    case TIMER_STOP: {
      return { ...state, isPlaying: false };
    }

    case TOGGLE_RECORD: {
      return {
        ...state,
        isRecordingOn: state.isRecordingOn ? false : true
      }
    }

    case TEMPO_CHANGE: {
      let newTempo = action.payload.tempo;
      if (typeof newTempo === 'string') {
        newTempo = parseFloat(newTempo);
      }
      return { ...state, tempo: newTempo };
    }

    case CLEAR_RECORDING: {
      // Disable recording mode if entire recording was cleared
      if (!action.payload.instrumentId) {
        return { ...state, isRecordingOn: false }
      } else {
        return state;
      }
    }
    
    default: {
      return state;
    }
  }
}
