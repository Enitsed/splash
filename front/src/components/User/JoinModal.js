import React, { Component } from 'react'
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react'

export default class JoinModal extends Component {
  state = { modalOpen: false }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  render() {
    return (
      <Modal
        trigger={<Button
            className="btn_header"
            size="tiny"
            onClick={this.handleOpen}>Join</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        size='small'
      >
        <Header icon='browser' content='Join Form' />
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
          <Button color='red' onClick={this.handleClose} inverted>
            Cancel
          </Button>
          <Button color='green' onClick={this.handleClose} inverted>
            <Icon name='checkmark' /> Submit
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}