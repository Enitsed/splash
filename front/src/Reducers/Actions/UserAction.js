// define Action type
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

// define Action Creator function
export const Login = (payload) => ({
  type: LOG_IN,
  payload: {
    userData: JSON.parse(JSON.stringify(payload)),
  },
});

export const Logout = (payload) => ({
  type: LOG_OUT,
  payload: {
    userData: JSON.parse(JSON.stringify(payload)),
  },
});
