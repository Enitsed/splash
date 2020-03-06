import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class BasicMenu extends Component {
  render() {
    const currentPath = this.props.location.pathname;

    return (
      <div className={this.props.className}>
        <ul>
          <li className={currentPath === '/' ? 'active' : ''}>
            <Link to="/">Home</Link>
          </li>
          <li className={currentPath === '/board' ? 'active' : ''}>
            <Link to="/board">Board</Link>
          </li>
          <li className={currentPath === '/album' ? 'active' : ''}>
            <Link to="/album">Album</Link>
          </li>
          <li className={currentPath === '/about' ? 'active' : ''}>
            <Link to="/about">About me</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default withRouter(BasicMenu);
