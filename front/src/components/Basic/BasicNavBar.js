import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import BasicButton from './BasicButton';
import LoginModal from '../User/LoginModal';
import JoinModal from '../User/JoinModal';
import FindInfoModal from '../User/FindInfoModal';
import { Logout, Login } from '../../Redux/Actions';
import { cookieRequestUserData } from '../../services/UserService';

class BasicNavBar extends Component {
  componentWillMount() {
    const { tryLogin } = this.props;
    cookieRequestUserData()
      .then((data) => {
        console.dir(data);
        if (data) {
          tryLogin(data);
        }
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { userData, tryLogout } = this.props;

    return userData.user_status !== 'inactive' ? (
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
