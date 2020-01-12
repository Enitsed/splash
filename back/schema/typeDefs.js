const { gql } = require("apollo-server-express");

module.exports = gql`
  type Query {
    user(user_seq: ID!): User
    userLogin(userLoginInput: User_Login_Input!): User
    users: [User!]!
  }

  type Mutation {
    addUser(userSignUpInput: User_Sign_Up_Input!): User
  }

  """
  common type and enums
  """
  enum Role {
    ADMIN
    MANAGER
    USER
  }

  scalar Date

  """
  inputs
  """
  input User_Login_Input {
    user_id: String!
    user_password: String!
  }

  input User_Sign_Up_Input {
    user_name: String
    user_id: String!
    user_password: String!
    gender: String
    address: String
    phone_num: String
    email: String
  }

  type User {
    user_seq: ID
    user_name: String
    user_id: String
    user_password: String
    gender: String
    address: String
    phone_num: String
    email: String
    user_status: String
    create_time: Date
  }
`;
