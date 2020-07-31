const { gql } = require("apollo-server-express");

module.exports = gql`
  type Query {
    user(user_seq: ID!): User
    userLogin(userLoginInput: User_Login_Input!): User
    users: [User!]!
    categories: [Category]
  }

  type Mutation {
    addUser(userSignUpInput: User_Sign_Up_Input!): User
    addCategory(categoryInput: Category_Input_Add!): Category
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

  input Category_Input_Add {
    category_seq: String
    category_name: String
    category_lvl: Int
    parent_category_seq: String
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
    login_history: Auth_History
    createdAt: String
    updatedAt: String
  }

  type Auth_History {
    seq: ID
    login_ip: String
    login_status: String
    user_num: Int
    createdAt: String
    updatedAt: String
  }

  type Category {
    category_seq: String
    category_name: String
    category_lvl: Int
    parent_category_seq: String
    reg_id: String
    reg_ip: String
    createdAt: String
    updatedAt: String
  }
`;
