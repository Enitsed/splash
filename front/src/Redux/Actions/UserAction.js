import { UserActionTypes } from '../ActionTypes';

// define Action Creator function
const Login = payload => ({
  type: UserActionTypes.LOG_IN,
  payload: {
    userLogin: true,
    userData: payload,
  },
});

const Logout = () => ({
  type: UserActionTypes.LOG_OUT,
  payload: {
    userLogin: false,
    userData: null,
  },
});

export { Login, Logout };
