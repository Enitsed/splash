import React, { Component } from 'react';
import styled from 'styled-components';

class CustomButton extends Component {
  render() {
    return (
      <button
        type="button"
        className={this.props.className}
        onClick={this.props.clickHandler}
      >
        {this.props.text}
      </button>
    );
  }
}

const BasicButton = styled(CustomButton)``;

export default BasicButton;