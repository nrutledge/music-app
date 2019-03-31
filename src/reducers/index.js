import { combineReducers } from 'redux';
import record from './record';
import controls from './controls';
import instruments from './instruments';

export default combineReducers({
    record,
    controls,
    instruments
});