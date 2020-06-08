import React, { Component } from 'react';
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
import { requestSignUp } from '../../services/UserService';

export default class JoinModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      userName: '',
      userNameError: false,
      id: '',
      idError: false,
      password: '',
      passwordError: false,
      gender: 'M',
      genderError: false,
      address: '',
      addressError: false,
      phoneNum: '',
      phoneNumError: false,
      email: '',
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
                '회원님의 회원가입 정보가 잘못되었습니다. 다시 입력 해주세요.',
            });
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
              onChange={(e) =>
                this.setState({
                  id: e.target.value,
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
              onChange={(e) =>
                this.setState({
                  password: e.target.value,
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
              onChange={(e) =>
                this.setState({
                  userName: e.target.value,
                  userNameError: false,
                  accountError: false,
                })
              }
            />
            <Form.Group inline>
              <label>Gender</label>
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
              onChange={(e) =>
                this.setState({
                  address: e.target.value,
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
              onChange={(e) =>
                this.setState({
                  phoneNum: e.target.value,
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
              onChange={(e) =>
                this.setState({
                  email: e.target.value,
                  emailError: false,
                  accountError: false,
                })
              }
            />
            <Message error header="Error" content={errorMsg} />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => this.closeModal()} inverted>
            Cancel
          </Button>
          <Button color="green" onClick={(e) => this.signUp(e)} inverted>
            <Icon name="checkmark" />
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
