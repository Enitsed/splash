import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

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
            <div className="ui big form">
                <div className="field">
                    <label>ID</label>
                    <input placeholder="ID" type="text" />
                </div>
                <div className="field">
                    <label>Password</label>
                    <input placeholder="Password" type="password" />
                </div>
                <div className="field">
                    <label>Name</label>
                    <input placeholder="Name" type="text" />
                </div>
            </div>
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