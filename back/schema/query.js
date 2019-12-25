const { GraphQLObjectType } = require("graphql");
const userQueries = require("../models/user/queries");
const authQueries = require("../models/auth/queries");

module.exports = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getUserInfo: userQueries.user,
    users: userQueries.users,
    auth: authQueries.login_history_detail,
    auth_list: authQueries.login_history_list
  }
});
