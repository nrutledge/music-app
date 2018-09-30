import { combineReducers } from 'redux';
import record from './record';
import playIndex from './playIndex';

export default combineReducers({
    record,
    playIndex
});