import React, { Component } from 'react';
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

  closeModal() {
    this.setState({ modalOpen: false });
  }

  render() {
    const { modalOpen } = this.state;
    return (
      <Modal
        trigger={modalOpenButton(this)}
        open={modalOpen}
        onClose={() => this.closeModal()}
        size="small"
      >
        <Header icon="browser" content="Join Form" />
        <Modal.Content>
          <Form size="big">
            <Form.Field>
              <label htmlFor="id_input">
                ID
                <input
                  id="id_input"
                  name="id_input"
                  placeholder="ID"
                  type="text"
                />
              </label>
            </Form.Field>
            <Form.Field>
              <label htmlFor="password_input">
                Password
                <input
                  id="password_input"
                  name="password_input"
                  placeholder="Password"
                  type="password"
                />
              </label>
            </Form.Field>
            <Form.Field>
              <label htmlFor="name_input">
                Name
                <input
                  id="name_input"
                  name="name_input"
                  placeholder="Name"
                  type="text"
                />
              </label>
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => this.closeModal()} inverted>
            Cancel
          </Button>
          <Button color="green" onClick={() => this.closeModal()} inverted>
            <Icon name="checkmark" />
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
