import React, { Component } from 'react';
import BasicHeader from '../../components/Basic/BasicHeader';
import BasicNavBar from '../../components/Basic/BasicNavBar';
import BasicContainer from '../../components/Basic/BasicContainer';
import BasicFooter from '../../components/Basic/BasicFooter';
import styled from 'styled-components';
import AlbumContainer from '../../components/Album/AlbumContainer';

class Layout extends Component {

    render() {
        return (
            <div className={this.props.className}>
                <BasicHeader>
                    <h2>연습장</h2>
                </BasicHeader>
                <BasicNavBar />
                <BasicContainer>
                    <AlbumContainer></AlbumContainer>
                </BasicContainer>
                <BasicFooter>
                    <h2>By Me</h2>
                    <p>이것은 연습장입니다. 하단에 무엇이 들어갈지 안정해졌어요By Me</p>
                </BasicFooter>
            </div>
        );
    }

}

const BasicLayout = styled(Layout)`
    min-height : 50vh;
`;

export default BasicLayout;