import React, { Component } from 'react';
import styled from 'styled-components';
import { Route, Link } from 'react-router-dom';
import BasicHeader from './BasicHeader';
import BasicNavBar from './BasicNavBar';
import BasicContainer from './BasicContainer';
import BasicFooter from './BasicFooter';
import AlbumContainer from '../Album/AlbumContainer';

class Layout extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <BasicHeader />
        <BasicContainer className="container">
          <Route path="/" exact component={testComponent} />
          <Route path="/timeline" exact component={testComponent2} />
        </BasicContainer>
        <BasicFooter />
      </div>
    );
  }
}

function testComponent() {
  return (
    <div className="poem-title">
      <p>아침엔 푸른바다</p>
      <p>저녁엔 주황바다</p>
      <p>새벽엔 검은바다</p>
    </div>
  );
}

function testComponent2() {
  return (
    <div className="poem-title">
      <p>꼬꼬댁 꼬꼬</p>
    </div>
  );
}

const BasicLayout = styled(Layout)`
  min-height: 50vh;
`;

export default BasicLayout;
