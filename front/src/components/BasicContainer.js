import React, { Component } from 'react';
import styled from 'styled-components';

class Container extends Component {

    render() {
        return (
            <div className={this.props.className}>
                {this.props.children}
            </div>
        );
    }
}

const BasicContainer = styled(Container)`
    display : flex;
    margin : 0 auto;
    width : 90%;
    background-color: #231232;
`;

export default BasicContainer;