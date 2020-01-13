const Constants = require("../models/common/Constants");
const User = require("../models/user/user");
const TimeStamp = require("../models/common/GraphQLTimestamp");

const resolvers = {
  Query: {
    user(_, { user_seq }, context) {
      return User.getByUserSeq(_, { user_seq });
    },
    userLogin(_, { userLoginInput }, context) {
      const { user_id, user_password } = userLoginInput;
      if (!user_id) {
        return new Error("type user id");
      }

      if (!user_password) {
        return new Error("type user password");
      }

      return User.getUserInfo(_, { user_id, user_password });
    },
    users(_, fields, context) {
      return User.findMatching(_, fields);
    }
  },
  Mutation: {
    async addUser(_, { userSignUpInput }) {
      const { user_id } = userSignUpInput;

      await User.findMatching(_, { user_id })
        .then(res => {
          if (res.shift() || res.length > 0) {
            throw new Error("user id already exists");
          }
        })
        .catch(err => {
          throw new Error(err);
        });

      const fields = {
        ...userSignUpInput,
        user_status: Constants.USER_STATUS.ACTIVE,
        create_time: new Date()
      };

      return await User.createEntry(_, fields);
    }
  },
  Date: TimeStamp
};

module.exports = resolvers;
