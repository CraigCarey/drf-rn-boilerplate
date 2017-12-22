import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import EmployeeFormReducer from './TodoFormReducer';
import TodoReducer from './TodoReducer';

export default combineReducers({
    auth: AuthReducer,
    todoForm: EmployeeFormReducer,
    todos: TodoReducer
});
