import {
    RECEIVE_CURRENT_USER,
    LOGOUT_CURRENT_USER,
    CHECK_LOGGED_IN
} from "../../actions/session";

const _nullSession = { userId: null, role: null, school: null}

export default (state = _nullSession, { type, user }) => {
    Object.freeze(state);
    switch (type) {
    case RECEIVE_CURRENT_USER:
        return user;
    case CHECK_LOGGED_IN:
        if (!user) {
            return state
        }
        return user;
    case LOGOUT_CURRENT_USER:
        return _nullSession;
    default:
        return state;
    }
}