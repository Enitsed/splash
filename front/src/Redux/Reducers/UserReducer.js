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
  switch (type) {
    case 'LOG_IN':
      state = JSON.parse(JSON.stringify(payload));
      console.dir(state);
      return state;
    case 'LOG_OUT':
      state = JSON.parse(JSON.stringify(payload));
      console.dir(state);
      return state;
    default:
      return state;
  }
};

export default UserReducer;
