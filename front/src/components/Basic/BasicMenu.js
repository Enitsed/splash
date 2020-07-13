import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Proptypes from 'prop-types';

class BasicMenu extends Component {
  render() {
    const { location, active } = this.props;
    const currentPath = location.pathname;
    return (
      <div className={active ? 'menu' : 'menu hidden'}>
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
  active: true,
};

BasicMenu.propTypes = {
  location: Proptypes.shape({
    pathname: Proptypes.string,
  }),
  active: Proptypes.bool,
};
