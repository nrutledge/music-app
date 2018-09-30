import { KEY_PRESS } from '../actions/types';

const record = (state = [], action) => {
    switch(action.type) {
        case KEY_PRESS:
            const { playIndex, key, isKeyUp, isPlayBack } = action.payload;

            // Don't record keys being played back
            if (isPlayBack) { return state; }

            let newPressedKeys = { ...state[playIndex] };
            if (isKeyUp) {
                newPressedKeys[key] = 'u'
            } else {
                newPressedKeys[key] = 'd'
            }
            const newState = [ ...state ];
            newState[playIndex] = newPressedKeys;
            return newState;
        default:
            return state;
    }
}

export default record;