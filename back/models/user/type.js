let {
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLNonNull
} = require('graphql');
let TimestampType = require('../common/GraphQLTimestamp');

// Defines the type
module.exports = new GraphQLObjectType({
    name: 'User',
    description: 'user info',
    fields: {
        user_seq: {
            type: new GraphQLNonNull(GraphQLID)
        },
        user_name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        user_id: {
           type: new GraphQLNonNull(GraphQLString)
        },
        user_password: {
           type: new GraphQLNonNull(GraphQLString)
        },
        gender: {
           type: GraphQLString
        },
        address: {
           type: GraphQLString
        },
        phone_num: {
           type: GraphQLString
        },
        email: {
           type: GraphQLString
        },
        user_status: {
           type: new GraphQLNonNull(GraphQLString)
        },
        create_time: {
           type: TimestampType
        },
    }
})