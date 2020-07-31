import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  Button,
  Header,
  Icon,
  Modal,
  Form,
  Input,
  Message,
  Radio,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Login } from '../../Reducers/Actions';
import { requestSignUp } from '../../services/UserService';

class JoinModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      userName: '',
      id: '',
      password: '',
      gender: 'M',
      address: '',
      phoneNum: '',
      email: '',
      userNameError: false,
      passwordError: false,
      idError: false,
      genderError: false,
      addressError: false,
      phoneNumError: false,
      emailError: false,
      accountError: false,
      errorMsg: '',
    };
  }

  signUp() {
    const {
      userName,
      id,
      password,
      gender,
      address,
      phoneNum,
      email,
    } = this.state;
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

    if (!email) {
      this.setState({
        emailError: true,
        errorMsg: '이메일을 다시 입력하세요.',
      });
      return;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      this.setState({
        emailError: true,
        errorMsg: '이메일을 다시 입력하세요.',
      });
      return;
    }

    const user = requestSignUp(
      userName,
      id,
      password,
      gender,
      address,
      phoneNum,
      email,
    );
    if (user !== undefined) {
      user
        .then((data) => {
          if (!data) {
            this.setState({
              accountError: true,
              errorMsg:
                '회원 가입 처리 중 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.',
            });
          } else if (data.errorMsg) {
            this.setState({
              accountError: true,
              errorMsg: data.errorMsg,
            });
          } else {
            // reset input
            this.setState({
              modalOpen: false,
              userName: '',
              id: '',
              password: '',
              gender: 'M',
              address: '',
              phoneNum: '',
              email: '',
            });

            loginComplete(data);
          }
        })
        .catch((err) => {
          console.debug(err);
        });
    }
  }

  render() {
    const {
      modalOpen,
      userNameError,
      idError,
      passwordError,
      genderError,
      addressError,
      phoneNumError,
      emailError,
      accountError,
      errorMsg,
      gender,
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
            Join
          </Button>
        }
        open={modalOpen}
        onClose={() => this.setState({ modalOpen: false })}
        size="small"
      >
        <Header icon="browser" content="Join Form" />
        <Modal.Content>
          <Form
            size="big"
            error={
              userNameError ||
              idError ||
              passwordError ||
              genderError ||
              addressError ||
              phoneNumError ||
              emailError ||
              accountError
            }
          >
            <Form.Field
              id="form-input-control-error-id"
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
            <Form.Field
              label="User Name"
              placeholder="User Name"
              control={Input}
              error={userNameError || accountError}
              onChange={(e, { value }) =>
                this.setState({
                  userName: value,
                  userNameError: false,
                  accountError: false,
                })
              }
            />
            <Form.Group inline>
              <Form.Field label="Gender"></Form.Field>
              <Form.Field
                control={Radio}
                error={genderError || accountError}
                label="Male"
                value="M"
                checked={gender === 'M'}
                onClick={(e, { value }) => {
                  this.setState({
                    gender: value,
                    genderError: false,
                    accountError: false,
                  });
                }}
              />
              <Form.Field
                control={Radio}
                error={genderError || accountError}
                label="Femail"
                value="F"
                checked={gender === 'F'}
                onClick={(e, { value }) =>
                  this.setState({
                    gender: value,
                    genderError: false,
                    accountError: false,
                  })
                }
              />
            </Form.Group>
            <Form.Field
              label="Address"
              placeholder="Address"
              control={Input}
              error={addressError || accountError}
              onChange={(e, { value }) =>
                this.setState({
                  address: value,
                  addressError: false,
                  accountError: false,
                })
              }
            />
            <Form.Field
              label="Phone Number"
              placeholder="Phone Number"
              control={Input}
              error={phoneNumError || accountError}
              onChange={(e, { value }) =>
                this.setState({
                  phoneNum: value,
                  phoneNumError: false,
                  accountError: false,
                })
              }
            />
            <Form.Field
              label="Email"
              placeholder="Email"
              control={Input}
              error={emailError || accountError}
              onChange={(e, { value }) =>
                this.setState({
                  email: value,
                  emailError: false,
                  accountError: false,
                })
              }
            />
            <Message error header="Error" content={errorMsg} />
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
          <Button color="green" onClick={() => this.signUp()} inverted>
            <Icon name="checkmark" />
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

JoinModal.defaultProps = {
  loginComplete() {
    return false;
  },
};

JoinModal.propTypes = {
  loginComplete: propTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginComplete: (userData) => dispatch(Login(userData)),
  };
};

export default connect(null, mapDispatchToProps)(JoinModal);
