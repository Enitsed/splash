const { GraphQLObjectType } = require("graphql");
const userQueries = require("../models/user/queries");

module.exports = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: userQueries.user,
    users: userQueries.users
  }
});
