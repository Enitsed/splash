import { UserActionTypes } from '../ActionTypes';

// define Action Creator function
const Login = payload => ({
  type: UserActionTypes.LOG_IN,
  payload: {
    userData: payload,
  },
});

const Logout = () => ({
  type: UserActionTypes.LOG_OUT,
  payload: {
    userData: null,
  },
});

export { Login, Logout };
