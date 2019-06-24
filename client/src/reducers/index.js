import { combineReducers } from 'redux';
import controls from './controls';
import instruments from './instruments';
import keyboards from './keyboards';
import record from './record';
import modal from './modal';

export default combineReducers({
    controls,
    instruments,
    keyboards,
    record,
    modal
});