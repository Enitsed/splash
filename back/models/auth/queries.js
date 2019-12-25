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

// Defines the queries
module.exports = {
  login_history_list: {
    type: new GraphQLList(type),
    args: {},
    resolve: AuthManage.findMatching.bind(AuthManage)
  },
  login_history_detail: {
    type: type,
    args: {
      seq: { type: new GraphQLNonNull(GraphQLID) },
      user_num: { type: GraphQLInt },
      login_ip: { type: GraphQLString },
      login_status: { type: new GraphQLNonNull(GraphQLString) },
      login_date: { type: TimestampType }
    },
    resolve: AuthManage.getByAuthManageSeq.bind(AuthManage)
  }
};
