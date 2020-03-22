import React, { Component } from 'react';
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';

function findInfoModalOpenButton(e) {
  return (
    <Button
      className="btn_header"
      size="tiny"
      onClick={() => e.setState({ modalOpen: true })}
    >
      Find ID / Password
    </Button>
  );
}
class FindInfoModal extends Component {
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
        trigger={findInfoModalOpenButton(this)}
        open={modalOpen}
        onClose={() => this.closeModal()}
        size="small"
      >
        <Header icon="browser" content="Find ID / Password" />
        <Modal.Content>
          <Form size="big">
            <Form.Group widths="equal">
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
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={() => this.closeModal()} inverted>
            <Icon name="checkmark" />
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(null, mapDispatchToProps)(FindInfoModal);
