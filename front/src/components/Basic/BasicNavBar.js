import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import BasicButton from './BasicButton';
import LoginModal from '../User/LoginModal';
import JoinModal from '../User/JoinModal';
import { Logout } from '../../Redux/Actions';

class NavBar extends Component {
  clickHandler = () => {
    return this.props.tryLogout();
  };

  render() {
    if (this.props.IsLogin) {
      return (
        <div className="nav">
          <p>{'Welcome! ' + this.props.User.name}</p>
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
          <BasicButton
            className="btn_header"
            text="Find ID / Password"
            size="tiny"
            clickHandler={this.openModal}
          />
        </div>
      );
    }
  }
}

const BasicNavBar = styled(NavBar)``;

const mapStateToProps = ({ UserReducer }) => ({
  IsLogin: UserReducer.IsLogin,
  User: UserReducer.User,
});

const mapDispatchToProps = dispatch => {
  return {
    tryLogout: () => dispatch(Logout()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BasicNavBar);
