import React, { Component } from 'react';
import styled from 'styled-components';

class NavBar extends Component {

    render() {
        return ( 
            <nav className = { this.props.className } ></nav>
        );
    }
}

const BasicNavBar = styled(NavBar)
`
    float : right;
    background-color : #8888
    width: 100px;
    height: 30px;
`

export default BasicNavBar;