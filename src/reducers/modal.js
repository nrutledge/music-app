import { SHOW_KEY_SETTINGS } from '../actions/types';

const initialState = { 
  hidden: true,
  editMode: false,
  source: ''
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SHOW_KEY_SETTINGS:
      return {
        ...state,
        hidden: false
      }
    default:
      return state;
  }
}