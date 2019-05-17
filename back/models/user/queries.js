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
            name: {
                type: GraphQLString
            },
            age: {
                type: GraphQlInt
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
            id: {
                type: GraphQLID
            }
        },
        resolve: User.getByID.bind(User)
    }
}