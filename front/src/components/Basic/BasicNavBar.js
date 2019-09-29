import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import BasicButton from './BasicButton';
import LoginModal from '../User/LoginModal';
import JoinModal from '../User/JoinModal';
import { Logout } from '../../Redux/Actions';

class NavBar extends Component {
  clickHandler = e => {
    console.log(this.state);
    console.log(this.props);
    return this.props.tryLogout();
  };

  render() {
    return (
      <div className="nav">
        {!this.props.IsLogin ? (
          <LoginModal />
        ) : (
          <BasicButton
            className="btn_header"
            clickHandler={this.clickHandler}
            text="Logout"
          ></BasicButton>
        )}
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

const BasicNavBar = styled(NavBar)``;

const mapStateToProps = ({ UserReducer }) => ({
  IsLogin: UserReducer.IsLogin,
});

const mapDispatchToProps = dispatch => {
  return {
    tryLogout: IsLogin => dispatch(Logout(IsLogin)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BasicNavBar);
