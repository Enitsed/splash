import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';
import proptypes from 'prop-types';

class CustomButton extends Component {
  render() {
    const { size, className, clickHandler, text } = this.props;
    return (
      <Button
        type="button"
        size={size}
        className={className}
        onClick={clickHandler}
      >
        {text}
      </Button>
    );
  }
}

CustomButton.propTypes = {
  size: proptypes.string,
  className: proptypes.string,
  clickHandler: proptypes.func,
  text: proptypes.string,
};

CustomButton.defaultProps = {
  size: 'tiny',
  className: '',
  clickHandler: () => ({}),
  text: '',
};

const BasicButton = styled(CustomButton)``;

export default BasicButton;
