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
const TimestampType = require("../common/GraphQLTimestamp");
const type = require("./type");
const AuthManage = require("./authManage");

// Defines the mutations
module.exports = {
  add_login_history: {
    type,
    args: {
      seq: { type: new GraphQLNonNull(GraphQLID) },
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
  },
  remove_login_history: {
    type,
    args: {
      seq: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: AuthManage.removeEntry.bind(AuthManage)
  },
  clear_login_history: {
    type,
    args: {},
    resolve: AuthManage.removeEntry.bind(authManage)
  }
};
