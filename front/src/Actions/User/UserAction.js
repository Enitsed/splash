// define Action type
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";


// define Action Creator function
export const Login = (payload) => ({
    type: LOG_IN,
    payload: {
        IsLogin: true,
        User: payload
    }
})

export const Logout = (payload) => ({
    type: LOG_OUT,
    payload: {
        IsLogin: false,
        User: {}
    }
})