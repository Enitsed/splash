import React, { Component } from 'react';
import styled from 'styled-components';
import BasicHeader from '../../components/Basic/BasicHeader';
import BasicNavBar from '../../components/Basic/BasicNavBar';
import BasicContainer from '../../components/Basic/BasicContainer';
import BasicFooter from '../../components/Basic/BasicFooter';
import AlbumContainer from '../../components/Album/AlbumContainer';

class Layout extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <BasicHeader />
        <BasicContainer />
        <BasicFooter />
      </div>
    );
  }
}

const BasicLayout = styled(Layout)`
  min-height: 50vh;
`;

export default BasicLayout;
