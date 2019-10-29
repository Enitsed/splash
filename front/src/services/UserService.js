import axios from 'axios';

const requestUserData = userSeq => {
  const usersQuery = `{user(user_seq : ${userSeq}){user_seq,user_name,gender,user_status}}`;

  return axios
    .get('/graphql', {
      params: {
        query: usersQuery,
      },
    })
    .then(response => {
      return response.data.data.user;
    })
    .catch(function(err) {
      console.log(err);
    });
};

const clearUserData = () => {};

export { requestUserData, clearUserData };
