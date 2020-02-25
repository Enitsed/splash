import axios from 'axios';

const requestUserData = (userId, userPassword) => {
  const userQuery = `query userLogin($user_id: String!, $user_password: String!) {
      user_seq,
      user_name,
      gender,
      user_status
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
      const data = response.data.data.getUserInfo;

      if (!data) {
        alert('error');
        return;
      }

      return data;
    })
    .catch(err => {
      alert('로그인이 실패하였습니다. 잠시 후 재시도 해주세요.');
      console.dir(err);
      return err;
    });
};

const clearUserData = () => {};

export { requestUserData, clearUserData };
