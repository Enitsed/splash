import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import styled from 'styled-components';

class CustomContainer extends Component {

    render() {
        return (
            <Container className={this.props.className}>
                {this.props.children}
            </Container>
        );
    }
}

const BasicContainer = styled(CustomContainer)`
    background-color: skyblue;
    min-height : 80vh;
`;

export default BasicContainer;