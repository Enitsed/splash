import React, { Component } from 'react';
import styled from 'styled-components';
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
          <div className="title_box">
            <h1 className="title">Lorem Ipsum</h1>
          </div>
          <BasicNavBar />
        </div>
        <BasicMenu className={this.state.active ? 'menu' : 'menu hidden'} />
      </header>
    );
  }
}

const BasicHeader = styled(CustomHeader)``;

export default BasicHeader;
