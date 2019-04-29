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
    position : relative;
    text-align : center;
    justify-content : center;
    min-width : 100px;
    min-height : 50px;
    top: 20px;
`;

export default BasicHeader;