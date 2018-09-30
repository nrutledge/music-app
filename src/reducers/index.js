import { combineReducers } from 'redux';
import play from './play';
import record from './record';
import playIndex from './playIndex';

export default combineReducers({
    play,
    record,
    playIndex
});