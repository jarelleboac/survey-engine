import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "../reducers/root";
import { composeWithDevTools } from 'redux-devtools-extension';

const {NODE_ENV} = process.env;

let preloadedState = {};

export const store = createStore(reducer, preloadedState,  composeWithDevTools(
    applyMiddleware(thunk)));
