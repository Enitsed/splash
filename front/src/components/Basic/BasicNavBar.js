import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import BasicButton from './BasicButton';
import LoginModal from '../User/LoginModal';
import JoinModal from '../User/JoinModal';
import FindInfoModal from '../User/FindInfoModal';
import { Logout, Login } from '../../Reducers/Actions';
import {
  cookieRequestUserData,
  clearUserData,
} from '../../services/UserService';

class BasicNavBar extends Component {
  componentDidMount() {
    const { tryLogin } = this.props;

    const loggedUserData = cookieRequestUserData();
    if (loggedUserData) {
      loggedUserData.then((userData) => {
        tryLogin(userData);
      });
    }
  }

  render() {
    const { userData, tryLogout, history } = this.props;
    return (
      <div className="nav">
        {userData && userData.user_id ? (
          <>
            <p>
              Welcome!
              <br />
              {userData.user_id}
            </p>
            <BasicButton
              className="btn_header"
              clickHandler={() => {
                clearUserData()
                  .then((data) => {
                    if (!data || data.isAxiosError) {
                      alert(
                        '해당 서비스 요청에 응답이 없습니다. 잠시 후 다시 시도해 주세요.',
                      );
                      console.error(data.message);
                      return;
                    }
                    tryLogout();
                    history.push('/');
                  })
                  .catch((err) => console.error(err));
              }}
              text="Logout"
              size="tiny"
            />
          </>
        ) : (
          <>
            <LoginModal />
            <JoinModal />
            <FindInfoModal />
          </>
        )}
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
  userData: null,
  tryLogin: undefined,
  tryLogout: undefined,
  history: undefined,
};

BasicNavBar.propTypes = {
  userData: Proptypes.shape({
    user_name: Proptypes.string,
    user_status: Proptypes.string,
  }),
  tryLogin: Proptypes.func,
  tryLogout: Proptypes.func,
  history: Proptypes.shape({}),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(BasicNavBar));
