import React, { Component } from 'react';
import styled from 'styled-components';

class Footer extends Component {

    render() {
        return (
            <div className={this.props.className}>
              Footer
            </div>
        );
    }
}

const BasicFooter = styled(Footer)`
    width : 100%;
    min-height : 300px;
    background-color : black;
`;

export default BasicFooter