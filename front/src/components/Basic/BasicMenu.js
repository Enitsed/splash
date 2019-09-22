import React, { Component } from 'react';

class BasicMenu extends Component {
  render() {
    return <div className="menu">{this.props.children}</div>;
  }
}

export default BasicMenu;
