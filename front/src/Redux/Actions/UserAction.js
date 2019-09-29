import { UserActionTypes } from '../ActionTypes';

// define Action Creator function
const Login = payload => ({
  type: UserActionTypes.LOG_IN,
  payload: {
    IsLogin: true,
    User: payload,
  },
});

const Logout = payload => ({
  type: UserActionTypes.LOG_OUT,
  payload: {
    IsLogin: false,
    User: payload,
  },
});

export { Login, Logout };
