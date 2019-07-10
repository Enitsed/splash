import React, { Component } from 'react';
import BasicButton from './BasicButton';
import styled from 'styled-components';

class NavBar extends Component {
    constructor(props) {
      super(props);
    }

    render() {
        const isLogged = this.props.userService.isLogged;

        if(!isLogged) {
            return (
                <div className = { this.props.className }>
                    <BasicButton clickHandler={this.props.userService.requestUserData}>로그인</BasicButton>
                    <BasicButton>회원가입</BasicButton>
                </div>
            );
        } else {
            return (
                <div className = { this.props.className } >
                    <BasicButton clickHandler={this.props.userService.clearUserData}>{this.props.userService.user.user_name}님 로그아웃</BasicButton>
                    <BasicButton>마이페이지</BasicButton>
                </div>
            );
        }
    }
}

const BasicNavBar = styled(NavBar)`
    position : absolute;
    min-width : 200px;
    min-height : 50px;
    top : 5px;
    right : 5px;
`;

export default BasicNavBar;
