const { gql } = require("apollo-server-express");

module.exports = gql`
  type Query {
    user(user_seq: ID!): User
    userLogin(userInput: User_Login_Input!): User
    users: [User!]!
    category(category_seq: ID, board_limit: Int!): Category
    categories(category_lvl: Int, category_offset: Int): [Category]
    board(board_seq: ID!): Board
    listOfBoard(
      param: Board_Input_List!
      board_offset: Int
      board_limit: Int!
    ): [Board]
  }

  type Mutation {
    addUser(userInput: User_Sign_Up_Input!): User
    addCategory(categoryInput: Category_Input_Add!): Category
    removeCategory(category_seq: ID!): Result
    addBoard(boardInput: Board_Input_Add!): Board
    removeBoard(board_seq: ID!): Result
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
    category_name: String
    category_lvl: Int
    parent_category_seq: ID!
  }

  input Board_Input_Add {
    category_seq: ID!
    board_title: String
    board_content: String
    board_div_cd: String
  }

  input Board_Input_List {
    category_seq: ID!
    board_title: String
  }

  """
  types
  """
  type Result {
    status: String
    statusCode: Int
    resultMsg: String
    errorMsg: String
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
    login_history: Auth_History
    createdAt: String
    updatedAt: String
  }

  type Auth_History {
    seq: ID
    login_ip: String
    login_status: String
    user_seq: ID
    createdAt: String
    updatedAt: String
  }

  type Category {
    category_seq: ID
    category_name: String
    category_lvl: Int
    parent_category_seq: ID
    reg_id: String
    reg_ip: String
    createdAt: String
    updatedAt: String
    listOfBoard: [Board]
    childCategory: [Category]
  }

  type Board {
    board_seq: ID
    category_seq: ID
    board_title: String
    board_content: String
    board_div_cd: String
    reg_id: String
    reg_ip: String
    user_seq: ID
    createdAt: String
    updatedAt: String
    user: User
  }
`;
