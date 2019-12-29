// define User Initial States
const initialState = {
  userData: {
    user_seq: 0,
    user_name: '',
    gender: '',
    user_status: 0,
  },
  IsLogin: false,
};

// write reducer here
const UserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'LOG_IN':
      state = JSON.parse(JSON.stringify(payload));
      return state;
    case 'LOG_OUT':
      state = JSON.parse(JSON.stringify(payload));
      return state;
    default:
      return state;
  }
};

export default UserReducer;
