import React, { Component } from 'react';
import styled from 'styled-components';

class NavBar extends Component {

    render() {
        return ( 
            <nav className = { this.props.className } >
                <StyledButton>
                    로그인
                </StyledButton>
            </nav>
        );
    }
}

class Button extends Component {
    render() {
        return <a href="#">Hello </a>
    }
}

const StyledButton = styled(Button)`
    color : red;
    border : 1px solid yellow;
    border-radius : 5px;
    margin : 5px;
    padding : 5px;
    text-align : middle;
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