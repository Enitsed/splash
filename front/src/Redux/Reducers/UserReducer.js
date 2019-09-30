// define User Initial States
const initialState = {
  User: {
    name: '',
    age: '',
  },
  IsLogin: false,
};

// write reducer here
const UserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'LOG_IN':
      console.log(state);
      state = Object.assign(payload);
      alert('로그인 되었습니다.');
      return state;
    case 'LOG_OUT':
      console.log(state);
      state = Object.assign(payload);
      alert('로그아웃 되었습니다.');
      return state;
    default:
      return state;
  }
};

export default UserReducer;
