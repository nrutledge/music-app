import { KEY_PRESS } from '../actions/types';

export default function(state = {}, action) {
    switch(action.type) {
        case KEY_PRESS: 
            const newState = { ...state };
            if (action.payload.isKeyUp) {
                delete newState[action.payload.key]
            } else {
                newState[action.payload.key] = true;
            }
            return newState;
        default:
            return state
    }
}