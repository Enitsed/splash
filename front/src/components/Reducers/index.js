import { combineReducers } from 'redux';
import UserReducer from './UserReducer';

const indexReducer = combineReducers(UserReducer);

export default indexReducer;
