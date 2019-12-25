import React, { Component } from 'react';
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Login } from '../../Redux/Actions';
import { requestUserData } from '../../services/UserService';

export class LoginModal extends Component {
  state = {
    modalOpen: false,
    id: '',
    password: '',
  };

  handleOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  login = () => {
    let { id, password } = this.state;

    if (id === '') {
      alert('아이디를 입력해주세요.');
      return;
    }

    if (password === '') {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    let user = requestUserData(id, password);
    if (user !== undefined) {
      user
        .then(userData => {
          if (!!!userData || userData === undefined) {
            alert('회원님의 로그인 정보가 잘못되었습니다. 다시 입력 해주세요.');
            return;
          }

          this.props.tryLogin(userData);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  idInputHandler = e => {
    this.setState({ id: e.target.value });
  };

  passwordInputHandler = e => {
    this.setState({ password: e.target.value });
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
                <input
                  placeholder="ID"
                  type="text"
                  onChange={this.idInputHandler}
                />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input
                  placeholder="Password"
                  type="password"
                  onChange={this.passwordInputHandler}
                />
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
    tryLogin: userData => dispatch(Login(userData)),
  };
};

export default connect(null, mapDispatchToProps)(LoginModal);
