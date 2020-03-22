import ActionTypes from '../ActionTypes';

// define Action Creator function
const Login = payload => ({
  type: ActionTypes.UserActionTypes.LOG_IN,
  payload: {
    userData: payload,
  },
});

const Logout = payload => ({
  type: ActionTypes.UserActionTypes.LOG_OUT,
  payload: {
    userData: payload,
  },
});

export { Login, Logout };
