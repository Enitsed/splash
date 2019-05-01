const { GraphQLObjectType } = require('graphql');
const userMutation = require('../models/user/mutation');

module.exports = new GraphQLObjectType({
    name: 'RootMutationsType',
    fields: {
        addUser: userMutation.addUser,
        updateUser: userMutation.updateUser
    }
});