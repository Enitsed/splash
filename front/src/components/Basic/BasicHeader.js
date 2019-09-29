import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BasicNavBar from './BasicNavBar';
import BasicMenu from './BasicMenu';

class CustomHeader extends Component {
  constructor(props) {
    super(props);

    this.openModal.bind(this);
  }

  openModal(e) {
    // TODO open a modal for the button
    console.log(e);
  }

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
              <Link to="/">home</Link>
            </li>
            <li role="button">
              <Link to="/timeline">timeline</Link>
            </li>
            <li role="button">
              <Link to="/board">board</Link>
            </li>
            <li role="button">
              <Link to="/album">album</Link>
            </li>
            <li role="button">
              <Link to="/about">about me</Link>
            </li>
          </ul>
        </BasicMenu>
      </header>
    );
  }
}

const BasicHeader = styled(CustomHeader)``;

export default BasicHeader;
