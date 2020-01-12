const Constants = require("../models/common/Constants");
const User = require("../models/user/user");
const TimeStamp = require("../models/common/GraphQLTimestamp");

const resolvers = {
  Query: {
    user(_, { user_seq }, context) {
      console.dir(context);
      return User.getByUserSeq(_, { user_seq });
    },
    userLogin(_, { userLoginInput }) {
      const { user_id, user_password } = userLoginInput;
      return User.getUserInfo(_, { user_id, user_password });
    },
    users(_, fields, context) {
      console.dir(context);
      return User.findMatching(_, fields);
    }
  },
  Mutation: {
    addUser(_, { userSignUpInput }) {
      const {
        user_name,
        user_id,
        user_password,
        gender,
        address,
        phone_num,
        email
      } = userSignUpInput;

      return User.createEntry(_, {
        user_name,
        user_id,
        user_password,
        gender,
        address,
        phone_num,
        email,
        user_status: Constants.USER_STATUS.ACTIVE,
        create_time: new Date()
      });
    }
  },
  Date: TimeStamp
};

module.exports = resolvers;
