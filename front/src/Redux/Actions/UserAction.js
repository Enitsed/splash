import { UserActionTypes } from '../ActionTypes';

// define Action Creator function
const Login = payload => ({
  type: UserActionTypes.LOG_IN,
  payload: {
    IsLogin: true,
    User: payload,
  },
});

const Logout = () => ({
  type: UserActionTypes.LOG_OUT,
  payload: {
    IsLogin: false,
    User: null,
  },
});

export { Login, Logout };
