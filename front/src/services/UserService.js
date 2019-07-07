import React, { Component } from 'react';
import axios from 'axios';

class UserService extends Component {
    constructor(props) {
        super(props);
        this.requestUserData.bind(this);
    }

    requestUserData = () => {
        let usersQuery = "{user(user_seq : 1){user_seq,user_name,gender,user_status}}";
        
        return axios.get('/graphql', {
            params : {
                query : usersQuery
            }
        }).then((response) => {
            console.log(response);
            this.setState({user : response.data.data.user});
        }).catch(function(err) {
            console.log(err);
        });
    }

}

export default UserService;