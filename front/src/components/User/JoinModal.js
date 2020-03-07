import React, { Component, useState } from 'react';
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react';

function modalOpenButton(e) {
  // think should change the way to pass this to the function.
  // we can may use hooks. need to look into it.
  return (
    <Button
      className="btn_header"
      size="tiny"
      onClick={() => e.setState({ modalOpen: true })}
    >
      Join
    </Button>
  );
}

export default class JoinModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  render() {
    const { modalOpen } = this.state;
    return (
      <Modal
        trigger={modalOpenButton(this)}
        open={modalOpen}
        onClose={() => this.setState({ modalOpen: false })}
        size="small"
      >
        <Header icon="browser" content="Join Form" />
        <Modal.Content>
          <Form size="big">
            <Form.Field>
              <label>ID</label>
              <input placeholder="ID" type="text" />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input placeholder="Password" type="password" />
            </Form.Field>
            <Form.Field>
              <label>Name</label>
              <input placeholder="Name" type="text" />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="red"
            onClick={() => this.setState({ modalOpen: false })}
            inverted
          >
            Cancel
          </Button>
          <Button
            color="green"
            onClick={() => this.setState({ modalOpen: false })}
            inverted
          >
            <Icon name="checkmark" /> Submit
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
