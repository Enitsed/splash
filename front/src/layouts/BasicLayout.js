import React, { Component } from 'react';
import BasicHeader from '../components/BasicHeader';
import BasicFooter from '../components/BasicFooter';

class BasicLayout extends Component {

    render() {
        return (
            <div>
            <BasicHeader></BasicHeader>
            <BasicFooter></BasicFooter>
            </div>
        );
    }

}

export default BasicLayout;