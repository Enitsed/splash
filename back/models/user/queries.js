const {
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQlInt,
  GraphQLFloat
} = require("graphql");
const type = require("./type");
const mutation = require("./mutation");
const User = require("./user");

// Defines the queries
module.exports = {
  users: {
    type: new GraphQLList(type),
    args: {
      user_seq: {
        type: GraphQLID
      },
      user_id: {
        type: GraphQLString
      },
      gender: {
        type: GraphQLString
      }
    },
    resolve: User.findMatching.bind(User)
  },
  user: {
    type: type,
    args: {
      user_seq: {
        type: GraphQLID
      }
    },
    resolve: User.getByUserSeq.bind(User)
  }
};
