import React, { Component } from 'react';
import BasicHeader from '../../components/Basic/BasicHeader';
import BasicContainer from '../../components/Basic/BasicContainer';
import BasicFooter from '../../components/Basic/BasicFooter';

class BasicLayout extends Component {

    render() {
        return (
            <div>
            <BasicHeader></BasicHeader>
            <BasicContainer>
            </BasicContainer>
            <BasicFooter></BasicFooter>
            </div>
        );
    }

}

export default BasicLayout;