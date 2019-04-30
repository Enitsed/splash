const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

// create app
const app = express();

// body parser
app.use(bodyParser.json());

// router setting
app.use('/main', require('./Controllers/Main/MainRouter'));

// graphql schema seting
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

// port listening
app.listen(3010, () => console.log('Port is listening'));
