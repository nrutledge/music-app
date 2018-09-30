import { TIMER_START, TIMER_TICK, TIMER_STOP, TIMER_RESTART,  KEY_PRESS } from './types';

let timer = null;

export const timerStart = (interval) => {
    return (dispatch) => {
        // Don't start if no interval or timer is already running
        if (!interval || timer) { return; }

        timer = setInterval(() => dispatch(timerTick()), interval);
        dispatch({ type: TIMER_START });
    }
}

export const timerTick = () => {
    return {
        type: TIMER_TICK
    }
}

export const timerStop = () => {
    clearInterval(timer);
    timer = null;
    return {
        type: TIMER_STOP
    }
}

export const timerRestart = () => {
    return {
        type: TIMER_RESTART
    }
}

export const keyPress = (key, isKeyUp) => {
    return (dispatch, getState) => {
        const { playIndex } = getState();
        dispatch({
            type: KEY_PRESS,
            payload: { key, isKeyUp, playIndex }
        });
    }
}

