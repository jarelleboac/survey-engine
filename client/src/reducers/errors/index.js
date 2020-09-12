import { RECEIVE_CURRENT_USER, RESET_PASSWORD } from "../../actions/session";
import { CLEAR_ERRORS, RECEIVE_ERRORS } from "../../actions/error";

export default (state = "", { message, type }) => {
    Object.freeze(state);
    switch (type) {
    case RECEIVE_ERRORS:
        return message;
    case RECEIVE_CURRENT_USER:
    case CLEAR_ERRORS:
    case RESET_PASSWORD:
        return "";
    default:
        return state;
    }
};