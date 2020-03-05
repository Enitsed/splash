import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BasicMenu extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <ul>
          <li className="active">
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/board">Board</Link>
          </li>
          <li>
            <Link to="/album">Album</Link>
          </li>
          <li>
            <Link to="/about">About me</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default BasicMenu;
