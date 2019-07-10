import React, { Component } from 'react';
import axios from 'axios';

class UserService extends Component {
    constructor(props) {
        super(props);
        this.requestUserData.bind(this);
        this.clearUserData.bind(this);

        this.state = {
          user : {},
          isLogged : false
        };
    }

    componentDidMount() {
        console.log('called');
    }


    requestUserData = (userSeq) => {
        let usersQuery = "{user(user_seq : " + userSeq + "){user_seq,user_name,gender,user_status}}";

        return axios.get('/graphql', {
            params : {
                query : usersQuery
            }
        }).then((response) => {
            console.log(response);
            this.setState({user : response.data.data.user});
            this.setState({isLogged : true});
        }).catch(function(err) {
            console.log(err);
        });
    }

    clearUserData = () => {
      this.setState({user : {}, isLogged : false});
    }

    render() {
      return false;
    }

}

export default UserService;
