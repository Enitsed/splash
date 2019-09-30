import React, { Component } from 'react';
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Login } from '../../Redux/Actions';

export class LoginModal extends Component {
  state = {
    modalOpen: false,
    User: {
      name: 'default',
      age: '11',
    },
    IsLogin: false,
  };

  handleOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  login = () => {
    this.props.tryLogin(this.state.User);
  };

  render() {
    return (
      <Modal
        trigger={
          <Button className="btn_header" size="tiny" onClick={this.handleOpen}>
            Login
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        size="small"
      >
        <Header icon="browser" content="Login Form" />
        <Modal.Content>
          <Form size="big">
            <Form.Group widths="equal">
              <Form.Field>
                <label>ID</label>
                <input placeholder="ID" type="text" />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input placeholder="Password" type="password" />
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={this.login} inverted>
            <Icon name="checkmark" /> Log in
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tryLogin: User => dispatch(Login(User)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(LoginModal);
