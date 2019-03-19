import { TIMER_TICK, TIMER_RESTART, TOGGLE_RECORD, TEMPO_CHANGE } from '../actions/types';

const initialState = {
  playIndex: 0,
  status: 'stopped',
  isRecordingOn: false,
  tempo: 100
}

export default (state = initialState, action) => {
  switch(action.type) {
    case TIMER_TICK:
      return ({ ...state, playIndex: state.playIndex + 1 });
    case TIMER_RESTART:
      return ({ ...state, playIndex: 0 });
    case TOGGLE_RECORD:
      return {
        ...state,
        isRecordingOn: state.isRecordingOn ? false : true
      }
    case TEMPO_CHANGE:
      let newTempo = action.payload.tempo;
      if (typeof newTempo === 'string') {
        newTempo = parseFloat(newTempo);
      }
      return ({ ...state, tempo: newTempo });
    default:
      return state;
  }
}
