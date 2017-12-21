import {
    EMAIL_CHANGED,
    USERNAME_CHANGED,
    PASSWORD_CHANGED,
    PASSWORD2_CHANGED,
    LOGIN_USER_START,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    EMAIL_INVALID,
    USERNAME_INVALID,
    PASSWORD_INVALID,
    PASSWORD_MISMATCH,
    CLEAR_AUTH_ERRORS
} from './types';

const ServerAddress = "http://localhost:8080";

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    }
};

export const usernameChanged = (text) => {
    return {
        type: USERNAME_CHANGED,
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

        if (email.length < 3) {
            dispatch({ type: EMAIL_INVALID });
            return;
        }

        if (password.length < 8) {
            dispatch({ type: PASSWORD_INVALID });
            return;
        }

        return fetch(`${ServerAddress}/api/auth/login/`, {
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
            if (!response.ok) {
                throw response;
            }
            return response.json();
        })
        .then(responseJson => {
            console.log("SUCCESS!");
            loginUserSuccess(dispatch, responseJson['token']);
        })
        .catch(error => {
            console.log("ERROR!");
            error.json()
            .then(errorJson => {
                console.log(errorJson);
                loginUserFail(dispatch);
            })
        });
    };
};

export const registerUser = ({ email, username, password, password2 }) => {

    return (dispatch) => {

        dispatch({ type: LOGIN_USER_START });

        if (email.length < 3) {
            dispatch({ type: EMAIL_INVALID });
            return;
        }

        if (username.length === 0) {
            dispatch({ type: USERNAME_INVALID });
            return;
        }

        if (password.length < 8) {
            dispatch({ type: PASSWORD_INVALID });
            return;
        }

        if (password !== password2) {
            dispatch({ type: PASSWORD_MISMATCH });
            return;
        }

        return fetch(`${ServerAddress}/api/auth/profile/`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                name: username,
                password: password,
                password2: password2
            })
        })
        .then(response => {
            if (!response.ok) {
                throw response;
            }
            return
        })
        .then(() => {
            console.log("SUCCESS!");
            registerUserSuccess(dispatch);
        })
        .catch(error => {
            console.log("ERROR!");
            error.json()
            .then(errorJson => {
                console.log(errorJson);
                registerUserFail(dispatch, errorJson);
            })
        });
    }
};

export const clearAuthErrors = () => {
    return {
        type: CLEAR_AUTH_ERRORS
    };
};

const loginUserFail = (dispatch) => {

    let error_message = 'Authentication Failed';

    dispatch({
        type: LOGIN_USER_FAIL,
        payload: error_message
    });
};

const loginUserSuccess = (dispatch, auth_token) => {
    console.log(`loginUserSuccess. auth token: ${auth_token}`);
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: auth_token
    });
};

const registerUserFail = (dispatch, error) => {

    let error_message = 'Registration Failed';

    console.log(`registerUserFail: ${error}`);

    if (error.hasOwnProperty('email'))
    {
        error_message = error['email'];
    }
    else if (error.hasOwnProperty('name'))
    {
        error_message = error['name'];
    }
    else if (error.hasOwnProperty('password'))
    {
        error_message = error['password'];
    }
    else if (error.hasOwnProperty('non_field_errors'))
    {
        error_message = error['non_field_errors'];
    }

    dispatch({
        type: REGISTER_USER_FAIL,
        payload: error_message
    });
};

const registerUserSuccess = (dispatch) => {
    dispatch({
        type: REGISTER_USER_SUCCESS
    });
};
