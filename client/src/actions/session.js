import * as apiUtil from '../utils/session';
import { receiveErrors } from "./error";

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const CHECK_LOGGED_IN = 'CHECK_LOGGED_IN'
export const RESET_PASSWORD = 'RESET_PASSWORD'
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE'


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

const resetPassword = data => ({
    type: RESET_PASSWORD,
    data
})

const clearMessage = () => ({
    type: CLEAR_MESSAGE
})


export const loginAction = user => async dispatch => {
    const response = await apiUtil.login(user);
    const data = await response.json();
    if (response.ok) {
        console.log(data)
        localStorage.setItem('jwtToken', `Bearer ${data.token}`)
        return dispatch(receiveCurrentUser(data.session));
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
        localStorage.removeItem('jwtToken')
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

export const resetPasswordAction = user => async dispatch => {
    try {
        dispatch(clearMessage())
        const response = await apiUtil.resetPassword(user);
        const data = await response.json();
        if (response.ok) {
            return dispatch(resetPassword(data))
        }
        
        return dispatch(receiveErrors(data));
    } catch(err) {
        return dispatch(receiveErrors(err))
    }
}
