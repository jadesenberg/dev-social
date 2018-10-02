import axios from "axios";
import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_LOADING,
    GET_ERRORS,
    CLEAR_CURRENT_PROFILE,
    SET_CURRENT_USER
} from "./types";

import { logoutUser } from "./authActions";

//get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());

    axios
        .get("/api/profile")
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err => dispatch({ type: GET_PROFILE, payload: {} }));
};

//get all profiles
export const getProfiles = () => dispatch => {
    dispatch(setProfileLoading());

    axios
        .get("/api/profile/all")
        .then(res =>
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            })
        )
        .catch(err => dispatch({ type: GET_PROFILES, payload: null }));
};

//create profile
export const createProfile = (profileData, history) => dispatch => {
    axios
        .post("/api/profile", profileData)
        .then(res => history.push("/dashboard"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    };
};

export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    };
};

//add experience
export const addExperience = (expData, history) => dispatch => {
    axios
        .post("/api/profile/experience", expData)
        .then(res => history.push("/dashboard"))
        .catch(err =>
            dispatch({ type: GET_ERRORS, payload: err.response.data })
        );
};

//add education
export const addEducation = (eduData, history) => dispatch => {
    axios
        .post("/api/profile/education", eduData)
        .then(res => history.push("/dashboard"))
        .catch(err =>
            dispatch({ type: GET_ERRORS, payload: err.response.data })
        );
};

//delete account and profile
export const deleteAccount = () => dispatch => {
    if (window.confirm("Are you sure this cannot be undone")) {
        axios
            .delete("/api/profile")
            .then(res => {
                dispatch(logoutUser());
            })
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            );
    }
};

//delete experience
export const deleteExperience = id => dispatch => {
    if (window.confirm("Are you sure? This action is cannot be undone")) {
        axios
            .delete(`/api/profile/experience/${id}`)
            .then(res =>
                dispatch({
                    type: GET_PROFILE,
                    payload: res.data
                })
            )
            .catch(err =>
                dispatch({ type: GET_ERRORS, payload: err.response.data })
            );
    }
};

export const deleteEducation = id => dispatch => {
    if (window.confirm("Are you sure? This action is cannot be undone")) {
        axios
            .delete(`/api/profile/education/${id}`)
            .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
            .catch(err =>
                dispatch({ type: GET_ERRORS, payload: err.response.data })
            );
    }
};
