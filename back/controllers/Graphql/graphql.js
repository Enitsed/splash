const graphqlHTTP = require("express-graphql");
const router = require("express").Router();
const schema = require("../../schema/schema");

router.get(
  "/",
  graphqlHTTP({
    schema,
    graphiql: () => process.env.NODE_ENV === "production"
  })
);

router.post(
  "/",
  graphqlHTTP({
    schema,
    graphiql: false
  })
);

module.exports = router;
