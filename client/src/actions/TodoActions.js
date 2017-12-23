import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ServerAddress } from './ApiUtils';

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

    return (dispatch) => {
        AsyncStorage.getItem('@AuthStore:token')
            .then(auth_token => {
                return fetch(`${ServerAddress}/api/todos/`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${auth_token}`
                    },
                    body: JSON.stringify({
                        name: name,
                        done: done
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw response;
                    }
                    return;
                })
                .then(() => {
                    dispatch({ type: TODO_CREATE });
                    Actions.main({ type: 'replace' });
                })
                .catch(error => {
                    console.log(error);
                    dispatch({ type: TODO_CREATE });
                    Actions.main({ type: 'replace' });
                })
            });
    }
};

export const todosFetch = () => {

    return (dispatch) => {
        AsyncStorage.getItem('@AuthStore:token')
            .then(auth_token => {
                return fetch(`${ServerAddress}/api/todos/`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${auth_token}`
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw response;
                    }
                    return response.json();
                })
                .then(responseJson => {
                    dispatch({ type: TODOS_FETCH_SUCCESS, payload: responseJson })
                })
                .catch(error => {
                    error.json()
                        .then(errorJson => {
                            console.log(errorJson);
                        })
                });
        });
    }
};

export const todoSave = ({ name, done, id }) => {

    return (dispatch) => {
        AsyncStorage.getItem('@AuthStore:token')
            .then(auth_token => {
                return fetch(`${ServerAddress}/api/todos/${id}/`, {
                    method: 'PATCH',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${auth_token}`
                    },
                    body: JSON.stringify({
                        name: name,
                        done: done
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw response;
                    }
                    return response.json();
                })
                .then(() => {
                    dispatch({ type: TODO_SAVE_SUCCESS });
                    Actions.main({ type: 'replace' });
                })
                .catch(error => {
                    console.log(error);
                    // TODO: display error modal
                    dispatch({ type: TODO_CLEAR });
                    Actions.main({ type: 'replace' });
                });
            });
    }
};

export const todoClear = () => {
    return ({ type: TODO_CLEAR });
};

export const todoDelete = ({ id }) => {

    return (dispatch) => {
        AsyncStorage.getItem('@AuthStore:token')
            .then(auth_token => {
                return fetch(`${ServerAddress}/api/todos/${id}/`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${auth_token}`
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw response;
                    }
                    return;
                })
                .then(() => {
                    dispatch({ type: TODO_CLEAR });
                    Actions.main({ type: 'replace' });
                })
                .catch(error => {
                    console.log(error);
                    // TODO: display error modal
                    dispatch({ type: TODO_CLEAR });
                    Actions.main({ type: 'replace' });
                })
        });
    }
};
