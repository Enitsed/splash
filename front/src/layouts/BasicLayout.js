import React, { Component } from 'react';
import BasicHeader from '../components/BasicHeader';
import BasicContainer from '../components/BasicContainer';
import BasicFooter from '../components/BasicFooter';

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