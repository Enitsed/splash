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
import { findIdInfo } from '../../services/UserService';

class FindInfoModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      email: '',
      emailError: false,
      emailResult: null,
      emailSuccess: false,
      errorMsg: 'Email 입력 오류',
    };

    this.findId.bind(this);
  }

  findId() {
    const { email } = this.state;

    if (email === '') {
      this.setState({ emailError: true });
      return;
    }

    findIdInfo(email)
      .then((data) => {
        if (!data) {
          this.setState({
            emailError: true,
            errorMsg: '입력하신 정보에 일치하는 회원이 없습니다.',
          });
        } else if (data.errorMsg) {
          this.setState({
            emailError: true,
            errorMsg: data.error,
          });
        } else {
          this.setState({
            emailSuccess: true,
            emailResult: `회원님의 아이디는 ${data}입니다.`,
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
      emailError,
      errorMsg,
      emailSuccess,
      emailResult,
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
          <Form size="big" error={emailError} success={emailSuccess}>
            <Form.Group widths="equal">
              <Form.Field
                label="Email"
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
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={() => this.findId()} inverted>
            <Icon name="checkmark" />
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default FindInfoModal;
