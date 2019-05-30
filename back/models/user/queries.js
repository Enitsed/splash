const { GraphQLList,
    GraphQLID,
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
            gender: {
                type: GraphQLString
            },
            address: {
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