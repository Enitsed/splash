import React, { Component } from 'react';
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
                <nav className = { this.props.className } >
                    <StyledButton clickHandler={this.login}>로그인</StyledButton>
                    <StyledButton>회원가입</StyledButton>
                </nav>
            )
        } else {
            return (
                <nav className = { this.props.className } >
                    <StyledButton clickHandler={this.logout}>로그아웃</StyledButton>
                    <StyledButton>마이페이지</StyledButton>
                </nav>
            )
        }
    }
}

class Button extends Component {
    render() {
        return <button className={ this.props.className } onClick={this.props.clickHandler}>{this.props.children}</button>
    }
}

const StyledButton = styled(Button)`
    color : red;
    border : 1px solid yellow;
    border-radius : 5px;
    margin : 5px;
    padding : 5px;
    text-align : middle;
    text-decoration : none;
`

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