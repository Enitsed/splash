import React, { Component } from 'react';
import BasicButton from './BasicButton';
import styled from 'styled-components';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin : false,
        }
    }

    login = () => {
        this.setState({isLogin : true});
    }
    
    logout = () => {
        this.setState({isLogin : false});
    }

    render() {
        const isLogged = this.state.isLogin;

        if(!isLogged) {
            return (
                <div className = { this.props.className }>
                    <BasicButton clickHandler={this.login}>로그인</BasicButton>
                    <BasicButton>회원가입</BasicButton>
                </div>
            )
        } else {
            return (
                <div className = { this.props.className } >
                    <BasicButton clickHandler={this.logout}>로그아웃</BasicButton>
                    <BasicButton>마이페이지</BasicButton>
                </div>
            )
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