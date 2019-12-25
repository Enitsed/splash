import axios from 'axios';

const requestUserData = (userId, userPassword) => {
  const userQuery =
  `query getUserInfo($user_id: String!, $user_password: String!) {
    getUserInfo(user_id: $user_id, user_password: $user_password) {
      user_seq,
      user_name,
      gender,
      user_status
    }
  }`;

  return axios
    .post('/graphql', {
      query: userQuery,
      variables: {
        "user_id": userId,
        "user_password": userPassword
      }
    })
    .then(response => {
      return response.data.data.getUserInfo;
    })
    .catch(err => {
      return err;
    });
};

const clearUserData = () => {};

export {
  requestUserData,
  clearUserData
};