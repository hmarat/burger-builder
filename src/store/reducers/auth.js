import * as actionTypes from "../actions/actionTypes"

import { updateObject } from "../utility"

const initState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: "/",
    autoAuthFinished: false
}

const authStart = (state, action) => {
    return updateObject(state, { loading: true, error: null })
}

const authSuccess = (state, action) => {
    return updateObject(state, { token: action.idToken, userId: action.localId, loading: false })
}

const authFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false })
}

const authLogout = (state, action) => {
    return updateObject(state, { token: null, tokenId: null })
}

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path })
}

const autoAuthFinished = (state, action) => {
    return updateObject(state, { autoAuthFinished: true });
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        case actionTypes.AUTO_AUTH_FINISHED: return autoAuthFinished(state, action);
        default: return state;
    }
}

export default reducer;