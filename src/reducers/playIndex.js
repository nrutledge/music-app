import { TIMER_TICK, TIMER_RESTART } from '../actions/types';

const playIndex = (state = 0, action) => {
    switch(action.type) {
        case TIMER_TICK:
            return state + 1;
        case TIMER_RESTART:
            return state = 0;
        default:
            return state;
    }
}

export default playIndex;