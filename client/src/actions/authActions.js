import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

export const registerUser = (userData, history) => dispatch => {
    axios
        .post("/api/users/register", userData)
        .then(res => history.push("/login"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const loginUser = userData => dispatch => {
    axios
        .post("api/users/login", userData)
        .then(res => {
            const { token } = res.data;
            //set token
            localStorage.setItem("jwtToken", token);
            //set token to header
            setAuthToken(token);
            //decode token to get userdata
            const decoded = jwt_decode(token);

            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

export const logoutUser = () => dispatch => {
    //remove token from localstorage
    localStorage.removeItem("jwtToken");
    //remove auth header
    setAuthToken(false);
    //set current user to {}
    dispatch(setCurrentUser({}));

    //    window.location.href = "/login";
};
