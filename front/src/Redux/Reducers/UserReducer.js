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
  const userState = payload ? JSON.parse(JSON.stringify(payload)) : state;
  switch (type) {
    case 'LOG_IN':
      console.dir(userState);
      return userState;
    case 'LOG_OUT':
      console.dir(userState);
      return userState;
    default:
      return userState;
  }
};

export default UserReducer;
