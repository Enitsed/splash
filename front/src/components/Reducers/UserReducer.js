import React, { Component } from 'react';

export default class UserReducer extends Component {
  constructor(props) {
    super(props);
    this.authorizeUser.bind(this);
  }

  authorizeUser = (state = false, action) => {
    switch (action.type) {
      case 'login':
        alert('로그인 하셨습니다.');
        return !state;
      case 'logout':
        alert('로그아웃 되었습니다.');
        return state;
      default:
        return state;
    }
  };

  render() {
    return false;
  }
}
