import React, { Component } from 'react';
import styled from 'styled-components';

class CustomContainer extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <div className="contents">{this.props.children}</div>
      </div>
    );
  }
}

const BasicContainer = styled(CustomContainer)``;

export default BasicContainer;
