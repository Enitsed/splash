import React, { Component } from 'react';
import styled from 'styled-components';
import BasicButton from './BasicButton';

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { userService } = this.props;
    const { isLogged, requestUserData, clearUserData, user } = userService;

    if (!isLogged) {
      return (
        <div className={this.props.className}>
          <BasicButton clickHandler={requestUserData} text="로그인" />
          <BasicButton text="회원가입" />
        </div>
      );
    }
    return (
      <div className={this.props.className}>
        <BasicButton
          clickHandler={clearUserData}
          text="{{user.user_name}}님 로그아웃"
        />
        <BasicButton text="마이페이지" />
      </div>
    );
  }
}

const BasicNavBar = styled(NavBar)`
  position: absolute;
  min-width: 200px;
  min-height: 50px;
  top: 5px;
  right: 5px;
`;

export default BasicNavBar;
