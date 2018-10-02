import { combineReducers } from 'redux';
import record from './record';
import controls from './controls';
import tempo from './tempo';

export default combineReducers({
    record,
    controls,
    tempo
});