import { combineReducers } from 'redux';
import UserReducer from './UserReducer';

// Combined Reducer
// this will be our stores
// If you want to add more reducers, Import them and Add it below
const reducers = combineReducers({
  UserReducer,
});

export default reducers;
