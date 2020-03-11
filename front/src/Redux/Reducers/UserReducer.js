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
      this.state = JSON.parse(JSON.stringify(payload));
      console.dir(this.state);
      return state;
    case 'LOG_OUT':
      this.state = JSON.parse(JSON.stringify(payload));
      console.dir(this.state);
      return this.state;
    default:
      return this.state;
  }
};

export default UserReducer;
