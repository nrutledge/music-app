import { KEY_PRESS } from '../actions/types';

const record = (state = [], action) => {
    switch(action.type) {
        case KEY_PRESS:
            const { playIndex, key, isKeyUp } = action.payload;
            let newPressedKeys = { ...state[playIndex] };
            if (isKeyUp) {
                newPressedKeys[key] = 'u'
            } else {
                newPressedKeys[key] = 'd'
            }
            const newState = [ ...state ];
            newState[playIndex] = newPressedKeys;

            console.log(newState);
            return newState;
        default:
            return state;
    }
}

export default record;