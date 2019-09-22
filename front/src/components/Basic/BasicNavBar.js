import React, { Component } from 'react';
import styled from 'styled-components';
import BasicButton from './BasicButton';

class NavBar extends Component {
  render() {
    return (
      <div className="nav">
        <BasicButton
          className="btn_header"
          text="Login"
          clickHandler={this.openModal}
        />
        <BasicButton
          className="btn_header"
          text="Join"
          clickHandler={this.openModal}
        />
        <BasicButton
          className="btn_header"
          text="Find ID / Password"
          clickHandler={this.openModal}
        />
      </div>
    );
  }
}

const BasicNavBar = styled(NavBar)``;

export default BasicNavBar;
