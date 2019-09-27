import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

export default class LoginModal extends Component {
  state = { modalOpen: false }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  render() {
    return (
      <Modal
        trigger={<Button
            className="btn_header"
            size="tiny"
            onClick={this.handleOpen}>Login</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        size='small'
      >
        <Header icon='browser' content='Login Form' />
        <Modal.Content>
            <div className="ui big form">
                <div className="two fields">
                    <div className="field">
                    <label>ID</label>
                    <input placeholder="ID" type="text" />
                    </div>
                    <div className="field">
                    <label>Password</label>
                    <input placeholder="Password" type="password" />
                    </div>
                </div>
            </div>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.handleClose} inverted>
            <Icon name='checkmark' /> Log in
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}