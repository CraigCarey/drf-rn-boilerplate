import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    PASSWORD2_CHANGED,
    LOGIN_USER_START,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    REGISTER_USER_START,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    PASSWORD_MISMATCH,
    CLEAR_AUTH_ERRORS
} from '../actions/types';

const INITIAL_STATE = {
    email: '',
    password: '',
    password2: '',
    user: null,
    error: '',
    loading: false
};

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case EMAIL_CHANGED:
            // make a new object from the existing state and overwrite email field
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case PASSWORD2_CHANGED:
            return { ...state, password2: action.payload };
        case LOGIN_USER_START:
            return { ...state, loading: true, error: '' };
        case LOGIN_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case LOGIN_USER_FAIL:
            return { ...state, error: 'Authentication Failed.', loading: false };
        case REGISTER_USER_START:
            return { ...state, loading: true, error: '' };
        case REGISTER_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case REGISTER_USER_FAIL:
            return { ...state, error: 'Registration Failed.', loading: false };
        case PASSWORD_MISMATCH:
            return { ...state, error: 'Passwords do not match', loading: false };
        case CLEAR_AUTH_ERRORS:
            return { ...state, error: '' };
        default:
            return state;
    }
};
