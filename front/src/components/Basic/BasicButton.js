import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';

class CustomButton extends Component {
  render() {
    return (
      <Button
        type="button"
        size={this.props.size}
        className={this.props.className}
        onClick={this.props.clickHandler}
      >
        {this.props.text}
      </Button>
    );
  }
}

const BasicButton = styled(CustomButton)``;

export default BasicButton;
