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
      state = Object.assign(payload);
      console.log(state);
      alert('로그인 되었습니다.');
      return state;
    case 'LOG_OUT':
      state = Object.assign(payload);
      console.log(state);
      alert('로그아웃 되었습니다.');
      return state;
    default:
      return state;
  }
};

export default UserReducer;
