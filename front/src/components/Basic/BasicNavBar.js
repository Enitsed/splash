import React, { Component } from 'react';
import styled from 'styled-components';
import BasicButton from './BasicButton';
import LoginModal from '../User/LoginModal';
import JoinModal from '../User/JoinModal';

class NavBar extends Component {
  render() {
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

const BasicNavBar = styled(NavBar)``;

export default BasicNavBar;
