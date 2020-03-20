import ActionTypes from '../ActionTypes';

// define Action Creator function
const Login = payload => ({
  type: ActionTypes.UserActionTypes.LOG_IN,
  payload: {
    userData: payload,
  },
});

const Logout = () => ({
  type: ActionTypes.UserActionTypes.LOG_OUT,
  payload: {
    userData: null,
  },
});

export { Login, Logout };
