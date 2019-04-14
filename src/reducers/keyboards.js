import keyboards from '../config/keyboards';
import { KEY_RESET_COMPLETED, TIMER_STOP, TIMER_RESTART, CLEAR_RECORDING } from '../actions/types';

const initialState = {
  keyboard: keyboards.mac,
  reset: false
}

export default (state = initialState, action) => {
  switch(action.type) {
    case TIMER_STOP:
    case TIMER_RESTART:
    case CLEAR_RECORDING:
      return {
        ...state,
        reset: true
      }
    case KEY_RESET_COMPLETED:
      return {
        ...state,
        reset: false
      }
    default:
      return state;
  }
}