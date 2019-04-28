import React, { Component } from 'react';
import styled from 'styled-components';
import BasicNavBar from './BasicNavBar';

class Header extends Component {

    render() {
        return (
            <div className={this.props.className}>
                <BasicNavBar></BasicNavBar>
            </div>
        );
    }
}

const BasicHeader = styled(Header)`
    width : 100%;
    padding-top : 5px;
    background-color: rgb(219, 112, 147);
    min-height : 30vh;
`;

export default BasicHeader;