import React, { Component } from 'react';
import BasicHeader from '../../components/Basic/BasicHeader';
import BasicNavBar from '../../components/Basic/BasicNavBar';
import BasicContainer from '../../components/Basic/BasicContainer';
import BasicFooter from '../../components/Basic/BasicFooter';
import styled from 'styled-components';

class Layout extends Component {

    render() {
        return (
            <div className={this.props.className}>
                <BasicContainer>
                    <BasicHeader>
                        <h2>연습장</h2>
                    </BasicHeader>
                    <BasicNavBar></BasicNavBar>
                </BasicContainer>
                <BasicFooter>
                </BasicFooter>
            </div>
        );
    }

}

const BasicLayout = styled(Layout)`
    min-height : 50vh;
`;

export default BasicLayout;