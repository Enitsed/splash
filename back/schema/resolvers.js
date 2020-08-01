const User = require("../models/user/user");
const TimeStamp = require("../models/common/GraphQLTimestamp");
const AuthService = require("../services/authService");
const CategoryService = require("../services/categoryService");
const BoardService = require("../services/boardService");

const resolvers = {
  Query: {
    user(_, { user_seq }, context) {
      if (!context.user || !context.user.isAdmin) {
        throw new Error("admin only");
      }
      return User.getByUserSeq(_, { user_seq });
    },

    users(_, fields, context) {
      if (!context.user || !context.user.isAdmin) {
        throw new Error("admin only");
      }
      return User.findMatching(_, fields);
    },

    userLogin(_, { userInput }, context) {
      return AuthService.getUserInfo(_, userInput);
    },

    category(_, { category_seq }, context) {
      return CategoryService.findCategory(_, { category_seq });
    },

    categories(_, { category_lvl }, context) {
      return CategoryService.categoryList(_, { category_lvl });
    },

    board(_, { board_seq }, context) {
      return BoardService.findBoard(_, { board_seq });
    },

    listOfBoard(_, { category_seq }, context) {
      return BoardService.boardList(_, { category_seq });
    },
  },
  Mutation: {
    addUser(_, { userInput }, context) {
      if (!context.user || !context.user.isAdmin) {
        throw new Error("admin only");
      }

      return AuthService.signUpUserInfo(_, userInput);
    },

    addCategory(_, { categoryInput }, context) {
      // if (!context.user || !context.user.isAdmin) {
      //   throw new Error("admin only");
      // }

      return CategoryService.addCategory(_, categoryInput);
    },

    removeCategory(_, { categoryInput }, context) {
      if (!context.user || !context.user.isAdmin) {
        throw new Error("admin only");
      }

      return CategoryService.removeCategory(_, categoryInput);
    },

    addBoard(_, { boardInput }, context) {
      if (!context.user) {
        throw new Error("member only");
      }

      return BoardService.writeBoard(_, {
        ...boardInput,
        user_seq: context.user.user_seq,
      });
    },
  },
  Date: TimeStamp,
};

module.exports = resolvers;
