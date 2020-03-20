import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Proptypes from 'prop-types';

class BasicMenu extends Component {
  render() {
    const { location, menuClass } = this.props;
    const currentPath = location.pathname;

    return (
      <div className={menuClass}>
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

BasicMenu.defaultProps = {
  location: '/',
  menuClass: 'menu',
};

BasicMenu.propTypes = {
  location: Proptypes.shape({
    pathname: Proptypes.string,
  }),
  menuClass: Proptypes.string,
};
