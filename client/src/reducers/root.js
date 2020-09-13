import { combineReducers } from 'redux';
import errors from './errors';
import session from './session';
import {
    RESET_PASSWORD
} from "../actions/session";
import {
    RECEIVE_ERRORS
} from "../actions/error"
import { triggerToast } from '../utils';

const messages = (state = "", { data, type }) => {
    Object.freeze(state);
    switch (type) {
    case RESET_PASSWORD:
        triggerToast(data.message);
        return data.message;
    case RECEIVE_ERRORS:
    default:
        return state;
    }
}


export default combineReducers({
    session,
    errors,
    messages,

});