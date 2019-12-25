const graphql = require("../Graphql/graphql");

module.exports = class Routes {
  /**
   * Applies the routes to specific paths
   * @param {*} app - The instance of express which will be serving requests.
   */
  constructor(app) {
    //Throws if no instance of express was passed
    if (app == null) throw new Error("You must provide an instance of express");

    //Registers the base GraphQLi base endpoint
    app.use("/graphql", graphql);

    // render React router
    app.get("/", (req, res) => {
      res.render("index");
    });

    app.get("/user", function(req, res) {
      res.send("he");
    });

    app.get("/about", function(req, res) {
      res.render("index");
    });
  }
};
