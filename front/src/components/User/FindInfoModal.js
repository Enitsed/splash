import React, { Component } from 'react';
import {
  Button,
  Header,
  Icon,
  Modal,
  Form,
  Message,
  Input,
} from 'semantic-ui-react';
import { findIdInfo, findPasswordInfo } from '../../services/UserService';

class FindInfoModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      toggleFind: 'email',
      email: '',
      emailError: false,
      emailResult: null,
      emailSuccess: false,
      id: '',
      idError: false,
      idResult: null,
      idSuccess: false,
      errorMsg: '입력 오류',
    };

    this.findId.bind(this);
  }

  findId() {
    const { email } = this.state;

    if (
      email === '' ||
      // eslint-disable-next-line no-useless-escape
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email,
      )
    ) {
      this.setState({
        emailError: true,
        errorMsg: '이메일이 올바른 형식이 아니거나 입력되지 않았습니다.',
      });
      return;
    }

    findIdInfo(email)
      .then((data) => {
        if (!data) {
          this.setState({
            emailError: true,
            errorMsg: '오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.',
          });
        } else if (data.errorCode) {
          this.setState({
            emailError: true,
            errorMsg: `${data.errorCode} : ${data.errorMsg}`,
          });
        } else {
          this.setState({
            emailError: false,
            emailSuccess: true,
            emailResult: `회원님의 아이디는 ${data}입니다.`,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  findPassword() {
    const { id } = this.state;

    if (id === '') {
      this.setState({ idError: true });
      return;
    }

    findPasswordInfo(id)
      .then((data) => {
        if (!data) {
          this.setState({
            idError: true,
            errorMsg: '오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.',
          });
        } else if (data.statusCode !== 200) {
          this.setState({
            idError: true,
            errorMsg: `${data.statusCode} : ${data.errorMsg}`,
          });
        } else {
          this.setState({
            idError: false,
            idSuccess: true,
            idResult: `${data.statusCode} : ${data.resultMsg}`,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const {
      modalOpen,
      errorMsg,
      toggleFind,
      emailError,
      emailSuccess,
      emailResult,
      idError,
      idSuccess,
      idResult,
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
            Find ID / Password
          </Button>
        }
        open={modalOpen}
        onClose={() => this.setState({ modalOpen: false })}
        size="small"
      >
        <Header icon="browser" content="Find ID / Password" />
        <Modal.Content>
          {toggleFind ? (
            <Form size="big" error={emailError} success={emailSuccess}>
              <Form.Group widths="equal">
                <Form.Field
                  label="Email을 입력해주세요"
                  placeholder="Email"
                  type="email"
                  control={Input}
                  error={emailError}
                  onChange={(e, { value }) => {
                    this.setState({
                      email: value,
                      emailError: false,
                      emailSuccess: false,
                    });
                  }}
                />
              </Form.Group>
              <Message error header="Error" content={errorMsg} />
              <Message success header="Success" content={emailResult} />
            </Form>
          ) : (
            <Form size="big" error={idError} success={idSuccess}>
              <Form.Group widths="equal">
                <Form.Field
                  label="ID를 입력해주세요"
                  placeholder="ID"
                  type="text"
                  control={Input}
                  error={idError}
                  onChange={(e, { value }) => {
                    this.setState({
                      id: value,
                      idError: false,
                      idSuccess: false,
                    });
                  }}
                />
              </Form.Group>
              <Message error header="Error" content={errorMsg} />
              <Message success header="Success" content={idResult} />
            </Form>
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="yellow"
            onClick={() =>
              this.setState({
                toggleFind: !toggleFind,
                idError: false,
                emailError: false,
              })
            }
            inverted
          >
            {toggleFind ? '비밀번호 찾기로 변경' : '아이디 찾기로 변경'}
          </Button>
          {toggleFind ? (
            <Button color="green" onClick={() => this.findId()} inverted>
              <Icon name="checkmark" />
              Find ID
            </Button>
          ) : (
            <Button color="green" onClick={() => this.findPassword()} inverted>
              <Icon name="checkmark" />
              Find Password
            </Button>
          )}
        </Modal.Actions>
      </Modal>
    );
  }
}

export default FindInfoModal;
