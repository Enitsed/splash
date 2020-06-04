const User = require("../models/user/user");
const AuthService = require("../services/authService");
const TimeStamp = require("../models/common/GraphQLTimestamp");

const resolvers = {
  Query: {
    user(_, { user_seq }, context) {
      if (!context.user || !context.user.isAdmin) {
        throw new Error("admin only");
      }
      return User.getByUserSeq(_, { user_seq }, context.user);
    },

    users(_, fields, context) {
      if (!context.user || !context.user.isAdmin) {
        throw new Error("admin only");
      }
      return User.findMatching(_, fields, context.user);
    },

    userLogin(_, { userLoginInput }, context) {
      return AuthService.getUserInfo(_, userLoginInput).userData;
    },
  },
  Mutation: {
    async addUser(_, { userSignUpInput }) {
      if (!context.user || !context.user.isAdmin) {
        throw new Error("admin only");
      }
      return AuthService.signUpUserInfo(_, userSignUpInput);
    },
  },
  Date: TimeStamp,
};

module.exports = resolvers;
