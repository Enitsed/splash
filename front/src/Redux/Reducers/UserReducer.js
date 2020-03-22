// define User Initial States
const initialState = {
  userData: {
    user_seq: 0,
    user_name: '',
    gender: '',
    user_id: '',
    address: '',
    phone_num: '',
    email: '',
    user_status: 'inactive',
    create_time: '',
  },
};

// write reducer here
const UserReducer = (state = initialState, { type, payload }) => {
  let userState = {};
  switch (type) {
    case 'LOG_IN':
      userState = JSON.parse(JSON.stringify(payload));
      return userState;
    case 'LOG_OUT':
      return userState;
    default:
      return state;
  }
};

export default UserReducer;
