const { 
    GraphQLNonNull,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLFloat
} = require('graphql');
const type = require('./type');
const User = require('./user');

// Defines the mutations
module.exports = {
    addUser: {
        type,
        args: {
            type:   { type: new GraphQLNonNull(GraphQLString) },
            name:  { type: new GraphQLNonNull(GraphQLFloat) },
        },
        resolve: User.createEntry.bind(User)
    },
    updateUser: {
        type,
        args: {
            id:     { type: GraphQLID },
            type:   { type:new GraphQLNonNull(GraphQLString) },
            name:  { type: new GraphQLNonNull(GraphQLFloat) },
        },
        resolve: User.updateEntry.bind(User)
    }
}