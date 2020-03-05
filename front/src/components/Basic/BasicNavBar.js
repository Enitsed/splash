import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import BasicButton from './BasicButton';
import LoginModal from '../User/LoginModal';
import JoinModal from '../User/JoinModal';
import FindInfoModal from '../User/FindInfoModal';
import { Logout } from '../../Redux/Actions';

class NavBar extends Component {
  clickHandler = () => {
    return this.props.tryLogout();
  };

  render() {
    if (this.props.userData.user_name) {
      return (
        <div className="nav">
          <p>
            Welcome!
            <br />
            {this.props.userData ? this.props.userData.user_name : null}
          </p>
          <BasicButton
            className="btn_header"
            clickHandler={this.clickHandler}
            text="Logout"
            size="tiny"
          />
        </div>
      );
    } else {
      return (
        <div className="nav">
          <LoginModal />
          <JoinModal />
          <FindInfoModal />
        </div>
      );
    }
  }
}

const BasicNavBar = styled(NavBar)``;

const mapStateToProps = ({ UserReducer }) => ({
  userData: UserReducer.userData,
});

const mapDispatchToProps = dispatch => {
  return {
    tryLogout: () => dispatch(Logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicNavBar);
