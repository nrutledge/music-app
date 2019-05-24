import { EDIT_KEY_SETTINGS, CLOSE_MODAL } from '../actions/types';

const initialState = { 
  hidden: true,
  title: '',
  renderProp: ''
}

export default (state = initialState, action) => {
  switch(action.type) {
    case EDIT_KEY_SETTINGS: {
      return { 
        ...state, 
        hidden: false, 
        title: action.payload.title, 
        renderProp: action.payload.renderProp 
      }
    }

    case CLOSE_MODAL: {
      return initialState;
    }
    
    default: {
      return state;
    }
  }
}