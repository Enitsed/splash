import axios from 'axios';
import Cookies from 'universal-cookie';

// request user Info with cookie
const cookieRequestUserData = () => {
  const cookie = new Cookies().get('user');
  if (!cookie || cookie === '') {
    return null;
  }

  return axios
    .post('/cookieLogin')
    .then((response) => {
      const { data } = response;

      return data;
    })
    .catch((err) => {
      console.error(err);
      // eslint-disable-next-line no-alert
      alert('로그인이 실패하였습니다. 잠시 후 재시도 해주세요.');
      return err;
    });
};

// request user Info with input
const requestUserData = (userId, userPassword) => {
  return axios
    .post('/login', {
      variables: {
        user_id: userId,
        user_password: userPassword,
      },
    })
    .then((response) => {
      const { data } = response;

      return data;
    })
    .catch((err) => {
      console.error(err);
      // eslint-disable-next-line no-alert
      alert('로그인이 실패하였습니다. 잠시 후 재시도 해주세요.');
      return err;
    });
};

// signUp user Info
const requestSignUp = (
  userName,
  userId,
  userPassword,
  gender,
  address,
  phoneNum,
  email,
) => {
  return axios
    .post('/signUp', {
      variables: {
        user_name: userName,
        user_id: userId,
        user_password: userPassword,
        gender,
        address,
        phone_num: phoneNum,
        email,
      },
    })
    .then((response) => {
      const userData = response.data;

      if (!userData) {
        console.error('no data availiable');
        return null;
      }

      return userData;
    })
    .catch((err) => {
      console.error(err);
      // eslint-disable-next-line no-alert
      alert('회원가입이 실패하였습니다. 잠시 후 재시도 해주세요.');
      return err;
    });
};

// session kill necessary
const clearUserData = () => {
  return axios
    .post('/logout')
    .then((res) => {
      if (!res || res.statusCode !== 200) {
        throw new Error('서버에서 오류가 발생하였습니다.');
      }

      alert(res.data.resultMsg);
    })
    .catch((err) => err);
};

const findIdInfo = (email) => {
  return axios
    .post('/findId', {
      variables: { email },
    })
    .then((response) => {
      const userData = response.data;

      if (!userData) {
        // console.error('no data availiable');
        return null;
      }

      return userData;
    })
    .catch((err) => {
      // eslint-disable-next-line no-alert
      alert('아이디 찾기에 실패하였습니다. 잠시 후 다시 시도 해주세요.');
      console.error(err);
    });
};

const findPasswordInfo = (id) => {
  return axios
    .post('/findPassword', {
      variables: { user_id: id },
    })
    .then((response) => {
      const result = response.data;

      if (!result) {
        console.error('no data availiable');
        return null;
      }

      return result;
    })
    .catch((err) => {
      // eslint-disable-next-line no-alert
      alert('비밀번호 찾기에 실패하였습니다. 잠시 후 다시 시도 해주세요.');
      console.error(err);
    });
};

export {
  cookieRequestUserData,
  requestUserData,
  clearUserData,
  requestSignUp,
  findIdInfo,
  findPasswordInfo,
};
