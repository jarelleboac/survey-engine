import { combineReducers } from 'redux';
import errors from './errors';
import session from './session';
import {
    RESET_PASSWORD
} from "../actions/session";
import {
    RECEIVE_ERRORS
} from "../actions/error"
import {
    SET_COUNTS
} from "../actions/email"
import {
    SET_COUNT
} from "../actions/generalStatus"
import {
    REDIRECT_TO_THANKS
} from "../actions/survey"
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

const emails = (state = {total: 0, unsent: 0, sent: 0, inprogress: 0, completed: 0}, {counts, type}) => {
    switch (type) {
    case SET_COUNTS:
        return counts;
    default:
        return state;
    }
}

const generalStatus = (state = {count: 0}, {count, type}) => {
    switch (type) {
    case SET_COUNT:
        return count;
    default:
        return state;
    }
}

const surveyRedirect = (state = false, {redirect, type}) => {
    switch (type) {
    case REDIRECT_TO_THANKS:
        return redirect;
    default:
        return state;
    }
}

export default combineReducers({
    session,
    errors,
    messages,
    emails,
    generalStatus,
    surveyRedirect
});