import { combineReducers } from 'redux';
import record from './record';
import controls from './controls';

export default combineReducers({
    record,
    controls
});