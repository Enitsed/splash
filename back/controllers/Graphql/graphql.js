const graphqlHTTP = require("express-graphql");
const router = require("express").Router();
const schema = require("../../schema/schema");

/**
 * this file is currently not used
 * implemented apollo-graphql instead
 * commented at 2020-01-12
 *  */

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
    graphiql: () => false
  })
);

module.exports = router;
