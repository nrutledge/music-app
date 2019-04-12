import keyboards from '../config/keyboards';
import { TOGGLE_KEY_RESET } from '../actions/types';

const initialState = {
  keyboard: keyboards.mac,
  reset: false
}

export default (state = initialState, action) => {
  switch(action.type) {
    case TOGGLE_KEY_RESET:
      return {
        ...state,
        reset: !state.reset
      }
    default:
      return state;
  }
}