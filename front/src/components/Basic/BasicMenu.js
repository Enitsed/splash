import React, { Component } from 'react';

class BasicMenu extends Component {
  render() {
    return <div className={this.props.className}>{this.props.children}</div>;
  }
}

export default BasicMenu;
