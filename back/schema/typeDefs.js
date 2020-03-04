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
  directives
  """
  directive @include on FIELD_DEFINITION

  """
  common type and enums
  """
  enum Role {
    ADMIN
    MANAGER
    USER
  }

  enum User_Status {
    ACTIVE
    DORMANT
    INACTIVE
    DELETED
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

  """
  types
  """
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
    login_history: Auth_History
  }

  type Auth_History {
    seq: ID
    login_ip: String
    login_date: Date
    login_status: String
    user_num: Int
  }
`;
