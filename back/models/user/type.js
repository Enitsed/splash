let {
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLList
} = require('graphql');

// Defines the type
module.exports = new GraphQLObjectType({
    name: 'User',
    description: 'user info',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        age: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        gender: {
            type: new GraphQLNonNull(GraphQLString)
        },
    }
})