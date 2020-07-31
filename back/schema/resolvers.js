const User = require("../models/user/user");
const AuthService = require("../services/authService");
const TimeStamp = require("../models/common/GraphQLTimestamp");
const CategoryService = require("../services/categoryService");

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

    userLogin(_, { userLoginInput }, context) {
      return AuthService.getUserInfo(_, userLoginInput);
    },

    categories(_, param, context) {
      return CategoryService.categoryList(param);
    },
  },
  Mutation: {
    addUser(_, { userSignUpInput }, context) {
      if (!context.user || !context.user.isAdmin) {
        throw new Error("admin only");
      }

      return AuthService.signUpUserInfo(_, userSignUpInput);
    },

    addCategory(_, { categoryInput }, context) {
      // if (!context.user || !context.user.isAdmin) {
      //   throw new Error("admin only");
      // }

      return CategoryService.addCategory(_, categoryInput);
    },
  },
  Date: TimeStamp,
};

module.exports = resolvers;
