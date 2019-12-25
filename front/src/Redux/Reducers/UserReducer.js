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
      alert('로그인 되었습니다.');
      return state;
    case 'LOG_OUT':
      state = JSON.parse(JSON.stringify(payload));
      alert('로그아웃 되었습니다.');
      return state;
    default:
      return state;
  }
};

export default UserReducer;
