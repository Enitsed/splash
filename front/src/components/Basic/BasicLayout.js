import React, { Component } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import BasicHeader from './BasicHeader';
import BasicContainer from './BasicContainer';
import BasicFooter from './BasicFooter';
import AlbumWrapper from '../Album/AlbumWrapper';
import Board from '../Board/Board';

class Layout extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <BasicHeader />
        <BasicContainer>
          <Route path="/" exact component={testComponent} />
          <Route path="/timeline" exact component={testComponent2} />
          <Route path="/board" exact component={Board} />
          <Route path="/album" exact component={AlbumWrapper} />
        </BasicContainer>
        <BasicFooter />
      </div>
    );
  }
}

function testComponent() {
  return <div className="poem-title">{visibleTextOnTime()}</div>;
}

function visibleTextOnTime() {
  const time = {
    midnight: 0,
    daytime: 8,
    evening: 18,
  };

  const nowTime = new Date().getHours();

  if (nowTime >= time.evening) {
    // evening
    return <p className="evening">저녁엔 주황바다</p>;
  }
  if (nowTime >= time.daytime && nowTime < time.evening) {
    // daytime
    return <p className="daytime">아침엔 푸른바다</p>;
  }
  if (nowTime >= time.midnight) {
    // midnight
    return <p className="midnight">새벽엔 검은바다</p>;
  }
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
