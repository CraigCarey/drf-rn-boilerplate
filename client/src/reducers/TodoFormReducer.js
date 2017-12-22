import {
    TODO_UPDATE,
    TODO_CREATE,
    TODO_SAVE_SUCCESS,
    TODO_CLEAR
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    done: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TODO_UPDATE:
            // action.payload === { prop: 'name' value: 'Add checkbox to form' }
            // [action.payload.prop] = name (through key interpolation)
            return { ...state, [action.payload.prop]: action.payload.value };
        case TODO_CREATE:
            return INITIAL_STATE;
        case TODO_SAVE_SUCCESS:
            return INITIAL_STATE;
        case TODO_CLEAR:
            return INITIAL_STATE;
        default:
            return state;
    }
}
