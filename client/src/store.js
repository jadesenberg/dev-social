import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"; //midleware
import rootReducer from "./reducers";

const middleware = [thunk];
const initialState = {};

const composeEnhancer =
    process.env.NODE_ENV !== "production" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              name: "App",
              actionBlacklist: ["REDUX_STORAGE_SAVE"]
          })
        : compose; // for redux dev tool

const enhancer = composeEnhancer(applyMiddleware(...middleware));

const store = createStore(
    rootReducer, // reducers
    initialState, // state
    enhancer //middleware, compose for redux dev tool
);

export default store;
