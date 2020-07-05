import React, { Component } from 'react';
import Proptypes from 'prop-types';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import BasicHeader from './BasicHeader';
import BasicContainer from './BasicContainer';
import BasicFooter from './BasicFooter';
import AlbumWrapper from '../Album/AlbumWrapper';
import BoardLayout from '../Board/BoardLayout';

class Layout extends Component {
  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <BasicHeader />
        <BasicContainer>
          <Route path="/" exact component={testComponent} />
          <Route path="/timeline" component={testComponent2} />
          <Route path="/board" component={BoardLayout} />
          <Route path="/album" component={AlbumWrapper} />
        </BasicContainer>
        <BasicFooter />
      </div>
    );
  }
}

function testComponent() {
  return (
    <div className="poem-title">
      <VisibleTextOnTime />
    </div>
  );
}

const VisibleTextOnTime = () => {
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
  return <p>default</p>;
};

function testComponent2() {
  return (
    <div className="poem-title">
      <p>꼬꼬댁 꼬꼬</p>
    </div>
  );
}

Layout.defaultProps = {
  className: '',
};

Layout.propTypes = {
  className: Proptypes.string,
};

const BasicLayout = styled(Layout)`
  min-height: 50vh;
`;

export default BasicLayout;
