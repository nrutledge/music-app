import { EDIT_INSTRUMENT, CLOSE_MODAL } from '../actions/types';

const initialState = { 
  hidden: true,
  title: '',
  content: ''
}

export default (state = initialState, action) => {
  switch(action.type) {
    case CLOSE_MODAL: {
      return initialState;
    }
    
    default: {
      return state;
    }
  }
}