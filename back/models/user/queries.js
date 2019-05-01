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
            type: {
                type: GraphQLString
            },
            price: {
                type: GraphQLFloat
            }
        },
        resolve: User.findMatching.bind(User)
    },
    user: {
        type,
        args: {
            id: {
                type: GraphQLID
            }
        },
        resolve: User.getByID.bind(User)
    }
}