const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("../../schema/schema");
const AuthService = require("../../services/authService");

module.exports = class Routes {
  /**
   * Applies the routes to specific paths
   * @param {*} app - The instance of express which will be serving requests.
   */
  constructor(app) {
    //Throws if no instance of express was passed
    if (app == null) throw new Error("You must provide an instance of express");

    const rootValue = {};

    //Implementing Apollo Server
    new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => {
        console.dir(req);
        rootValue.ip = req.ip;
      },
      rootValue: rootValue,
    }).applyMiddleware({ app });

    // render React router
    app.get("/", (req, res) => {
      res.render("index.html", { userData: req.session.user });
    });

    app.get("/check", (req, res) => {
      console.dir(req.session.user);
      res.render("index.html", { userData: req.session.user });
    });

    // login mapping
    app.post("/login", async (req, res) => {
      if (req.session.user) {
        res.redirect("/check");
        return;
      }

      const { user_id, user_password } = req.body.variables;

      req.session.user = await AuthService.getUserInfo(
        { ip: req.ip },
        {
          user_id,
          user_password,
        }
      );

      res.json(req.session.user);
    });
  }
};
