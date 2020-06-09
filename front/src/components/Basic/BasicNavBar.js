import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import BasicButton from './BasicButton';
import LoginModal from '../User/LoginModal';
import JoinModal from '../User/JoinModal';
import FindInfoModal from '../User/FindInfoModal';
import { Logout, Login } from '../../Redux/Actions';
import {
  cookieRequestUserData,
  clearUserData,
} from '../../services/UserService';

class BasicNavBar extends Component {
  constructor(props) {
    super();
    const { tryLogin } = props;
    cookieRequestUserData()
      .then((data) => {
        if (data) {
          tryLogin(data);
        }
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { userData, tryLogout } = this.props;

    return userData.user_status === 'active' ? (
      <div className="nav">
        <p>
          Welcome!
          <br />
          {userData.user_name}
        </p>
        <BasicButton
          className="btn_header"
          clickHandler={() => {
            clearUserData()
              .then(() => {
                tryLogout();
              })
              .catch((err) => console.error(err));
          }}
          text="Logout"
          size="tiny"
        />
      </div>
    ) : (
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

const mapDispatchToProps = (dispatch) => {
  return {
    tryLogin: (userData) => dispatch(Login(userData)),
    tryLogout: () => dispatch(Logout()),
  };
};

BasicNavBar.defaultProps = {
  userData: { user_name: '', user_status: 'inactive' },
  tryLogin: () => {},
  tryLogout: () => {},
};

BasicNavBar.propTypes = {
  userData: Proptypes.shape({
    user_name: Proptypes.string,
    user_status: Proptypes.string,
  }),
  tryLogin: Proptypes.func,
  tryLogout: Proptypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicNavBar);
