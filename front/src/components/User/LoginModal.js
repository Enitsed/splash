import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Login } from '../../Redux/Actions';
import { requestUserData } from '../../services/UserService';

export class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      id: '',
      password: '',
    };

    this.handleOpen.bind(this);
    this.handleClose.bind(this);
    this.login.bind(this);
    this.idInputHandler.bind(this);
    this.passwordInputHandler.bind(this);
  }

  handleOpen() {
    this.setState({ modalOpen: true });
  }

  handleClose() {
    this.setState({ modalOpen: false });
  }

  login() {
    const { id, password } = this.state;
    const { tryLogin } = this.props;

    if (id === '') {
      alert('아이디를 입력해주세요.');
      return;
    }

    if (password === '') {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    const user = requestUserData(id, password);
    if (user !== undefined) {
      user
        .then(userData => {
          if (!userData || userData === undefined) {
            alert('회원님의 로그인 정보가 잘못되었습니다. 다시 입력 해주세요.');
            return;
          }

          tryLogin(userData);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  idInputHandler(e) {
    this.setState({ id: e.target.value });
  }

  passwordInputHandler(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    const { modalOpen } = this.state;
    return (
      <Modal
        trigger={
          <Button
            className="btn_header"
            size="tiny"
            onClick={() => this.handleOpen()}
          >
            Login
          </Button>
        }
        open={modalOpen}
        onClose={() => this.handleClose()}
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
                  onChange={e => this.idInputHandler(e)}
                />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input
                  placeholder="Password"
                  type="password"
                  onChange={e => this.passwordInputHandler(e)}
                />
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={e => this.login(e)} inverted>
            <Icon name="checkmark" />
            Log in
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

LoginModal.defaultProps = {
  tryLogin: undefined,
};

LoginModal.propTypes = {
  tryLogin: PropTypes.func,
};
