import React, { Component } from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

class CustomContainer extends Component {
  render() {
    const { className, children } = this.props;
    return (
      <div className={className}>
        <section className="contents">{children}</section>
      </div>
    );
  }
}

CustomContainer.defaultProps = {
  className: '',
  children: <></>,
};

CustomContainer.propTypes = {
  className: propTypes.string,
  children: propTypes.node,
};

const BasicContainer = styled(CustomContainer)``;

export default BasicContainer;
