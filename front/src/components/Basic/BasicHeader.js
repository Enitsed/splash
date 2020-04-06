import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import MediaQuery from 'react-responsive';
import BasicNavBar from './BasicNavBar';
import BasicMenu from './BasicMenu';

class BasicHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
  }

  render() {
    const { active } = this.state;
    return (
      <header>
        <div className="basic_header">
          <MediaQuery maxWidth={1024}>
            <Icon
              className="sidebar main_logo"
              size="big"
              onClick={() => this.setState({ active: !active })}
            />
          </MediaQuery>
          <div className="title_box">
            <h1 className="title">Lorem Ipsum</h1>
          </div>
          <BasicNavBar />
        </div>
        <BasicMenu className={active ? 'menu' : 'menu hidden'} />
      </header>
    );
  }
}

export default BasicHeader;
