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
let TimestampType = require("../common/GraphQLTimestamp");

// Defines the type
module.exports = new GraphQLObjectType({
  name: "login_history",
  description: "login history",
  fields: {
    seq: { type: new GraphQLNonNull(GraphQLID) },
    user_num: { type: GraphQLInt },
    login_ip: { type: GraphQLString },
    login_status: { type: new GraphQLNonNull(GraphQLString) },
    login_date: { type: TimestampType }
  }
});
