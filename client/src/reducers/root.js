import { combineReducers } from 'redux';
import errors from './errors';
import session from './session';

export default combineReducers({
    session,
    errors
});