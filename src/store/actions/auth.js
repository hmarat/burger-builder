import axios from "axios"

import * as actionTypes from "./actionTypes"

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (idToken, localId) => {
    console.log("Authenticated in redux, and data already are in redux store")
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken,
        localId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("localId");
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authLogout = (expireTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expireTime * 1000);
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        }

        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBsDB5SccH1zRxR0WA0ur_0HmNxUq1UxkY";

        if (!isSignup) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBsDB5SccH1zRxR0WA0ur_0HmNxUq1UxkY"
        }

        axios.post(url, authData)
            .then(response => {
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(authLogout(response.data.expiresIn))
                localStorage.setItem("token", response.data.idToken);
                localStorage.setItem("localId", response.data.localId);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem("expirationDate", expirationDate);
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    }
}

export const autoAuthFinished = () => {
    return {
        type: actionTypes.AUTO_AUTH_FINISHED
    }
}

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        if (!token) {
            dispatch(logout());
        }
        else {
            const expirationDate = new Date(localStorage.getItem("expirationDate"));

            if (expirationDate.getTime() > new Date().getTime()) {
                const localId = localStorage.getItem("localId");
                dispatch(authSuccess(token, localId));
                dispatch(authLogout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
            else {
                dispatch(logout())
            }
        }
        dispatch(autoAuthFinished());
    }
}