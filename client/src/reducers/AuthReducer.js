import {
    EMAIL_CHANGED,
    USERNAME_CHANGED,
    PASSWORD_CHANGED,
    PASSWORD2_CHANGED,
    LOGIN_USER_START,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGOUT_USER,
    REGISTER_USER_START,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    EMAIL_INVALID,
    USERNAME_INVALID,
    PASSWORD_INVALID,
    PASSWORD_MISMATCH,
    CLEAR_AUTH_ERRORS
} from '../actions/types';

const INITIAL_STATE = {
    email: '',
    username: '',
    password: '',
    password2: '',
    auth_token: null,
    error: '',
    loading: false
};

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case EMAIL_CHANGED:
            // make a new object from the existing state and overwrite email field
            return { ...state, email: action.payload };
        case USERNAME_CHANGED:
            return { ...state, username: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case PASSWORD2_CHANGED:
            return { ...state, password2: action.payload };
        case LOGIN_USER_START:
            return { ...state, loading: true, error: '' };
        case LOGIN_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, auth_token: action.payload };
        case LOGIN_USER_FAIL:
            return { ...state, error: action.payload, loading: false };
        case LOGOUT_USER:
            return { ...state, ...INITIAL_STATE };
        case REGISTER_USER_START:
            return { ...state, loading: true, error: '' };
        case REGISTER_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case REGISTER_USER_FAIL:
            return { ...state, error: action.payload, loading: false };
        case EMAIL_INVALID:
            return { ...state, error: 'Email is invalid', loading: false };
        case USERNAME_INVALID:
            return { ...state, error: 'Username is invalid', loading: false };
        case PASSWORD_INVALID:
            return { ...state, error: 'Minimum password length: 8', loading: false };
        case PASSWORD_MISMATCH:
            return { ...state, error: 'Passwords do not match', loading: false };
        case CLEAR_AUTH_ERRORS:
            return { ...state, error: '' };
        default:
            return state;
    }
};
