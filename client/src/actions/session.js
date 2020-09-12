import * as apiUtil from '../utils/session';
import { receiveErrors } from "./error";

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const CHECK_LOGGED_IN = 'CHECK_LOGGED_IN'

const receiveCurrentUser = user => ({
    type: RECEIVE_CURRENT_USER,
    user
});

const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER
});

const checkLoggedIn = user => ({
    type: CHECK_LOGGED_IN,
    user
})

export const loginAction = user => async dispatch => {
    const response = await apiUtil.login(user);
    const data = await response.json();
    if (response.ok) {
        return dispatch(receiveCurrentUser(data));
    }
    return dispatch(receiveErrors(data));
};

export const signupAction = user => async dispatch => {
    const response = await apiUtil.signup(user);
    const data = await response.json();
  
    if (response.ok) {
        return dispatch(receiveCurrentUser(data));
    }
    return dispatch(receiveErrors(data));
};

export const logoutAction = () => async dispatch => {
    const response = await apiUtil.logout();
    const data = await response.json();
    if (response.ok) {
        return dispatch(logoutCurrentUser());
    }
    return dispatch(receiveErrors(data));
};

export const checkLoggedInAction = () => async dispatch => {
    const response = await apiUtil.checkLoggedIn();
    const data = await response.json();
    if (response.ok) {
        if (!data || !data.user) {
            dispatch(checkLoggedIn(data))
        }
        return dispatch(checkLoggedIn(data.user))
    }
    return dispatch(receiveErrors(data));
}

