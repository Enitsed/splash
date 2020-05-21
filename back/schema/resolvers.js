const User = require("../models/user/user");
const AuthService = require("../services/authService");
const TimeStamp = require("../models/common/GraphQLTimestamp");

const resolvers = {
  Query: {
    user(_, { user_seq }, context) {
      return User.getByUserSeq(_, { user_seq }, context.user);
    },

    users(_, fields, context) {
      return User.findMatching(_, fields, context.user);
    },

    userLogin(_, { userLoginInput }, context) {
      return AuthService.getUserInfo(_, userLoginInput, context);
    },
  },
  Mutation: {
    async addUser(_, { userSignUpInput }) {
      return AuthService.signUpUserInfo(_, userSignUpInput);
    },
  },
  Date: TimeStamp,
};

module.exports = resolvers;
