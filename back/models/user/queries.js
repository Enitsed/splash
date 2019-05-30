const { GraphQLList,
    GraphQLID,
    GraphQlInt,
    GraphQLString,
    GraphQLFloat } = require('graphql');
const type = require('./type');
const mutation = require('./mutation');
const User = require("./user");

// Defines the queries
module.exports = {
    users: {
        type: new GraphQLList(type),
        args: {
            user_id: {
                type: GraphQLString
            },
            name: {
                type: GraphQLString
            },
            gender: {
                type: GraphQLString
            }
        },
        resolve: User.findMatching.bind(User)
    },
    user: {
        type,
        args: {
            user_seq : {
                type: GraphQLID
            }
        },
        resolve: User.getByUserSeq.bind(User)
    }
}