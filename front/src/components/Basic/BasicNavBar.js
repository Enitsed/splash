import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import BasicButton from './BasicButton';
import LoginModal from '../User/LoginModal';
import JoinModal from '../User/JoinModal';
import FindInfoModal from '../User/FindInfoModal';
import { Logout } from '../../Redux/Actions';

class BasicNavBar extends Component {
  render() {
    const { userData, tryLogout } = this.props;

    if (userData.user_status === 'active') {
      return (
        <div className="nav">
          <p>
            Welcome!
            <br />
            {userData.user_name}
          </p>
          <BasicButton
            className="btn_header"
            clickHandler={() => {
              tryLogout();
            }}
            text="Logout"
            size="tiny"
          />
        </div>
      );
    }

    return (
      <div className="nav">
        <LoginModal />
        <JoinModal />
        <FindInfoModal />
      </div>
    );
  }
}

const mapStateToProps = ({ UserReducer }) => ({
  userData: UserReducer.userData,
});

const mapDispatchToProps = dispatch => {
  return {
    tryLogout: () => dispatch(Logout()),
  };
};

BasicNavBar.defaultProps = {
  userData: { user_name: '' },
  tryLogout: () => {
    return false;
  },
};

BasicNavBar.propTypes = {
  userData: Proptypes.shape({
    user_name: Proptypes.string,
  }),
  tryLogout: Proptypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicNavBar);
