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
const AuthManage = require("./authManage");
let TimestampType = require("../common/GraphQLTimestamp");

// Defines the mutations
module.exports = {
  add_login_history: {
    type,
    args: {
      user_num: { type: GraphQLInt },
      login_ip: { type: GraphQLString },
      login_status: { type: new GraphQLNonNull(GraphQLString) },
      login_date: { type: TimestampType }
    },
    resolve: AuthManage.createEntry.bind(AuthManage)
  },
  update_login_history: {
    type,
    args: {
      seq: { type: new GraphQLNonNull(GraphQLID) },
      user_num: { type: GraphQLInt },
      login_ip: { type: GraphQLString },
      login_status: { type: new GraphQLNonNull(GraphQLString) },
      login_date: { type: TimestampType }
    },
    resolve: AuthManage.updateEntry.bind(AuthManage)
  }
};
