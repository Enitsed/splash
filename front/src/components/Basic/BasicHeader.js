import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import MediaQuery from 'react-responsive';
import BasicNavBar from './BasicNavBar';
import BasicMenu from './BasicMenu';

class CustomHeader extends Component {
  constructor(props) {
    super(props);
  }
  
  state = { active: false };

  toggleActive = () => {
    this.setState({ active: !this.state.active });
  };

  render() {
    return (
      <header>
        <div className="header">
          <MediaQuery maxWidth={1024}>
            <Icon
              className="sidebar main_logo"
              size="big"
              onClick={this.toggleActive}
            />
          </MediaQuery>
          <div className="title">
            <h1>Wicked Child</h1>
          </div>
          <BasicNavBar />
        </div>
        <BasicMenu className={this.state.active ? 'menu' : 'menu hidden'}>
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
