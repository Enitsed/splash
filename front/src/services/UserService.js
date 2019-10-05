import React, { Component } from 'react';
import axios from 'axios';
export default class UserService extends Component {
  constructor(props) {
    super(props);
    this.requestUserData.bind(this);
    this.clearUserData.bind(this);
  }

  requestUserData = userSeq => {
    let usersQuery =
      '{user(user_seq : ' +
      userSeq +
      '){user_seq,user_name,gender,user_status}}';

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

  clearUserData = () => {};

  render() {
    return false;
  }
}
