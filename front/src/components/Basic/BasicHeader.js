import React, { Component } from 'react';
import styled from 'styled-components';
import BasicNavBar from './BasicNavBar';
import BasicMenu from './BasicMenu';

class CustomHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.openModal.bind(this);
  }

  openModal = e => {
    // TODO open a modal for the button
    console.log(e);
  };
  render() {
    return (
      <header>
        <div className="header">
          <div className="title">
            <h1>Wicked Child</h1>
          </div>
          <BasicNavBar />
        </div>
        <BasicMenu>
          <ul>
            <li role="button">
              <a href="#">home</a>
            </li>
            <li role="button">
              <a href="#">timeline</a>
            </li>
            <li role="button">
              <a href="#">board</a>
            </li>
            <li role="button">
              <a href="#">album</a>
            </li>
            <li role="button">
              <a href="#">about me</a>
            </li>
          </ul>
        </BasicMenu>
      </header>
    );
  }
}

const BasicHeader = styled(CustomHeader)``;

export default BasicHeader;
