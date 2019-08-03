import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class BasicButton extends Component {
  render() {
    const { text, clickHandler } = this.props;
    return <Button onClick={clickHandler}>{text}</Button>;
  }
}

export default BasicButton;
