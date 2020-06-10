import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Header,
  Icon,
  Modal,
  Form,
  Input,
  Message,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Login } from '../../Redux/Actions';
import { requestUserData } from '../../services/UserService';

class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      id: '',
      idError: false,
      password: '',
      passwordError: false,
      accountError: false,
      errorMsg: '',
    };

    this.login.bind(this);
  }

  login() {
    const { id, password } = this.state;
    const { loginComplete } = this.props;

    if (id === '') {
      this.setState({ idError: true, errorMsg: '아이디를 다시 입력하세요.' });
      return;
    }

    if (password === '') {
      this.setState({
        passwordError: true,
        errorMsg: '패스워드를 다시 입력하세요.',
      });
      return;
    }

    const user = requestUserData(id, password);
    if (user !== undefined) {
      user
        .then((data) => {
          if (!data) {
            this.setState({
              accountError: true,
              errorMsg:
                '회원님의 로그인 정보가 잘못되었습니다. 다시 입력 해주세요.',
            });
          }

          if (typeof data !== 'object') {
            console.error('errrorrr');
            return;
          }

          loginComplete(data);
        })
        .catch((err) => {
          console.debug(err);
        });
    }
  }

  render() {
    const {
      modalOpen,
      idError,
      passwordError,
      accountError,
      errorMsg,
    } = this.state;
    return (
      <Modal
        trigger={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Button
            className="btn_header"
            size="tiny"
            onClick={() => this.setState({ modalOpen: true })}
          >
            Login
          </Button>
        }
        open={modalOpen}
        onClose={() => this.setState({ modalOpen: false })}
        size="small"
      >
        <Header icon="browser" content="Login Form" />
        <Modal.Content>
          <Form size="big" error={idError || passwordError || accountError}>
            <Form.Group widths="equal">
              <Form.Field
                label="ID"
                placeholder="ID"
                control={Input}
                error={idError || accountError}
                onChange={(e, { value }) =>
                  this.setState({
                    id: value,
                    idError: false,
                    accountError: false,
                  })
                }
              />
              <Form.Field
                label="Password"
                placeholder="Password"
                type="password"
                control={Input}
                error={passwordError || accountError}
                onChange={(e, { value }) =>
                  this.setState({
                    password: value,
                    passwordError: false,
                    accountError: false,
                  })
                }
              />
            </Form.Group>
            <Message error header="Error" content={errorMsg} />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={() => this.login()} inverted>
            <Icon name="checkmark" />
            Log in
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginComplete: (userData) => dispatch(Login(userData)),
  };
};

LoginModal.defaultProps = {
  loginComplete() {
    return () => false;
  },
};
LoginModal.propTypes = {
  loginComplete: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(LoginModal);
