import { Actions } from 'react-native-router-flux';
import {
    TODO_UPDATE,
    TODO_CREATE,
    TODOS_FETCH_SUCCESS,
    TODO_SAVE_SUCCESS,
    TODO_CLEAR
} from './types';

export const todoUpdate = ({ prop, value }) => {
    return {
        type: TODO_UPDATE,
        payload: { prop, value }
    };
};

export const todoCreate = ({ name, done }) => {
    // const { currentUser } = firebase.auth();

    // return a 'pretend' function to satisfy redux-thunk
    return (dispatch) => {
        // firebase.database().ref(`/users/${currentUser.uid}/todos`)
        //     .push({ name, phone, shift})
        //     .then(() => {
        //         dispatch({ type: TODO_CREATE });
        //         Actions.pop();
        //     });
    }
};

export const todosFetch = () => {

    // const { currentUser } = firebase.auth();

    return (dispatch) => {
        // this watcher exists for the entire lifecycle of the application
        // firebase.database().ref(`/users/${currentUser.uid}/todos`)
        //     .on('value', snapshot => {
        //         dispatch({ type: TODOS_FETCH_SUCCESS, payload: snapshot.val() })
        //     });
    }
};

export const todoSave = ({ name, done, uid }) => {
    // const { currentUser } = firebase.auth();

    return (dispatch) => {
        // firebase.database().ref(`/users/${currentUser.uid}/todos/${uid}`)
        //     .set({ name, phone, shift })
        //     .then(() => {
        //         dispatch({ type: TODO_SAVE_SUCCESS });
        //         Actions.pop();
        //     });
    }
};

export const todoClear = () => {
    return ({ type: TODO_CLEAR });
};

export const todoDelete = ({ uid }) => {
    // const { currentUser } = firebase.auth();

    return (dispatch) => {
        // firebase.database().ref(`/users/${currentUser.uid}/todos/${uid}`)
        //     .remove()
        //     .then(() => {
        //         dispatch({ type: TODO_CLEAR });
        //         Actions.pop();
        //     });
    }
};
