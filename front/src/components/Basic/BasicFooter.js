import React, { Component } from 'react';
import styled from 'styled-components';

class Footer extends Component {

    render() {
        return (
            <div className={this.props.className}>
                {this.props.children}
            </div>
        );
    }
}

const BasicFooter = styled(Footer)`
    width : 100%;
    min-height : 20vh;
    display : flex;
    justify-content : center;
    background-color : skyblue;
`;

export default BasicFooter;