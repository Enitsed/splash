import React, { Component } from 'react';

class BasicButton extends Component {
  render() {
    return (
      <button
        className={this.props.className}
        onClick={this.props.clickHandler}
        type="button"
      >
        {this.props.text}
      </button>
    );
  }
}

export default BasicButton;
