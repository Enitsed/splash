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
const User = require("./user");
let TimestampType = require("../common/GraphQLTimestamp");

// Defines the mutations
module.exports = {
  addUser: {
    type,
    args: {
      user_name: { type: new GraphQLNonNull(GraphQLString) },
      user_id: { type: new GraphQLNonNull(GraphQLString) },
      user_password: { type: new GraphQLNonNull(GraphQLString) },
      gender: { type: GraphQLString },
      address: { type: GraphQLString },
      phone_num: { type: GraphQLString },
      email: { type: GraphQLString },
      user_status: { type: new GraphQLNonNull(GraphQLString) },
      create_time: { type: TimestampType }
    },
    resolve: User.createEntry.bind(User)
  },
  updateUser: {
    type,
    args: {
      user_seq: { type: new GraphQLNonNull(GraphQLID) },
      user_name: { type: new GraphQLNonNull(GraphQLString) },
      user_id: { type: new GraphQLNonNull(GraphQLString) },
      user_password: { type: new GraphQLNonNull(GraphQLString) },
      gender: { type: GraphQLString },
      address: { type: GraphQLString },
      phone_num: { type: GraphQLString },
      email: { type: GraphQLString },
      user_status: { type: new GraphQLNonNull(GraphQLString) },
      create_time: { type: TimestampType }
    },
    resolve: User.updateEntry.bind(User)
  }
};
