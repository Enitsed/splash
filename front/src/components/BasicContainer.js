import React, { Component } from 'react';
import styled from 'styled-components';

class Container extends Component {

    render() {
        return (
            <div className={this.props.className}>
                <BasicContainer></BasicContainer>
            </div>
        );
    }
}

const BasicContainer = styled(Container)`
    width : 80%;
    background-color: rgb(219, 112, 147);
`;

export default BasicContainer;