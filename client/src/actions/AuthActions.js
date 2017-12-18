import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    PASSWORD2_CHANGED,
    LOGIN_USER_START,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    PASSWORD_MISMATCH,
    CLEAR_AUTH_ERRORS
} from './types';

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    }
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    }
};

export const password2Changed = (text) => {
    return {
        type: PASSWORD2_CHANGED,
        payload: text
    }
};

// works asynchronously using redux-thunk
// manually dispatches an action to the store when call returns
export const loginUser = ({ email, password }) => {

    return (dispatch) => {
        dispatch({ type: LOGIN_USER_START });

        fetch("http://localhost:8080/api/auth/login/", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: email,
                password: password
            })
        })
        .then(response => {
            console.log(response);
            loginUserSuccess(dispatch, null);
        })
        .catch((error) => {
            console.log(error);
            loginUserFail(dispatch);
        });
    };
};

export const registerUser = ({ email, password, password2 }) => {

    return (dispatch) => {

        if (password !== password2) {
            dispatch({type: PASSWORD_MISMATCH});
        }
        else {

            dispatch({type: LOGIN_USER_START});

            // TODO
            // firebase.auth().createUserWithEmailAndPassword(email, password)
            //     .then(user => registerUserSuccess(dispatch, user))
            //     .catch((error) => {
            //         console.log(error);
            //         registerUserFail(dispatch);
            //     });
        }
    }
};

export const clearAuthErrors = () => {
    return {
        type: CLEAR_AUTH_ERRORS
    };
};

const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
};

const registerUserFail = (dispatch) => {
    dispatch({ type: REGISTER_USER_FAIL });
};

const registerUserSuccess = (dispatch, user) => {
    dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: user
    });
};
