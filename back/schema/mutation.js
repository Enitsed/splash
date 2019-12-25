const { GraphQLObjectType } = require("graphql");
const userMutation = require("../models/user/mutation");
const authMutation = require("../models/auth/mutation");

module.exports = new GraphQLObjectType({
  name: "RootMutationsType",
  fields: {
    addUser: userMutation.addUser,
    updateUser: userMutation.updateUser,
    add_login_history: authMutation.add_login_history,
    update_login_history: authMutation.update_login_history
  }
});
