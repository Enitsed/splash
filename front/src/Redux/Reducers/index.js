import { combineReducers } from 'redux';
import * as reducers from './UserReducer';

const indexReducer = combineReducers(reducers);

export default indexReducer;
