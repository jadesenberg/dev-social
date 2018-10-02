import { combineReducers } from "redux";
import auth from "./authReducer";
import errors from "./errorReducer";
import profile from "./profileReducer";

export default combineReducers({ auth, errors, profile });
