import axios from 'axios';

// request user Info
const requestUserData = (userId, userPassword) => {
  const userQuery = `query UserLogin($user_id: String!, $user_password: String!) {
    userLogin(userLoginInput: {user_id: $user_id, user_password: $user_password}) {
      user_seq
      user_name
      user_id
      gender
      user_status
      create_time
      address
      phone_num
      email
      login_history {
        login_status
        login_date
      }
    }
  }`;

  return axios
    .post('/graphql', {
      query: userQuery,
      variables: {
        user_id: userId,
        user_password: userPassword,
      },
    })
    .then(response => {
      const data = response.data.data.userLogin;

      if (!data) {
        console.error('no data availiable');
        return;
      }

      return data;
    })
    .catch(err => {
      console.error(err);
      alert('로그인이 실패하였습니다. 잠시 후 재시도 해주세요.');
      return err;
    });
};

// session kill necessary
const clearUserData = () => {
  //
};

export { requestUserData, clearUserData };
