import { combineReducers } from 'redux';
import studentProfileReducer from './Reducers/studentProfileReducer';
import socketReducer from './Reducers/socketReducer';

export const rootReducer = combineReducers({
    studentProfileReducer,
    socketReducer
});