import React, { Component } from 'react';
import styled from 'styled-components';
import BasicButton from './BasicButton';

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
                <nav className = { this.props.className } >
                    <BasicButton clickHandler={this.login}>로그인</BasicButton>
                    <BasicButton>회원가입</BasicButton>
                </nav>
            )
        } else {
            return (
                <nav className = { this.props.className } >
                    <BasicButton clickHandler={this.logout}>로그아웃</BasicButton>
                    <BasicButton>마이페이지</BasicButton>
                </nav>
            )
        }
    }
}

const BasicNavBar = styled(NavBar)`
    display : flex;
    float : right;
    background-color : #8888;
    width : 300px;
    height : 50px;
    padding : 5px;
    justify-content : center;
`

export default BasicNavBar;