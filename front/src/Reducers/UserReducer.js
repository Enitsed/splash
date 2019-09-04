const UserReducer = (state = false, action) => {
  switch (action.type) {
    case 'login':
      alert('로그인 하셨습니다.');
      return (state = true);
    case 'logout':
      alert('로그아웃 되었습니다.');
      return (state = false);
    default:
      return state;
  }
};

export { UserReducer };
