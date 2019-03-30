const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(bodyParser.json());

var schema = buildSchema(`
    type Query {
        hello: String
    }
`)

var root = {
    
}

app.use('/graphql', graphqlHttp({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(3010, () => console.log('Port is listening'));
