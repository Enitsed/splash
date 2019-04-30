import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import styled from 'styled-components';

class CustomHeader extends Component {

    render() {
        return (
            <div className={this.props.className}>
                <Header size='huge'>
                    {this.props.children}
                </Header>
            </div>
        );
    }
}

const BasicHeader = styled(CustomHeader)`
    padding-top : 5vh;
    text-align : center;
    width : 100%;
    min-height : 10vh;
    background-color : skyblue;
`;

export default BasicHeader;