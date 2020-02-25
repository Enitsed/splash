const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("../../schema/schema");
const User = require("../../models/user/user");
const AuthService = require("../../services/authService");

module.exports = class Routes {
  /**
   * Applies the routes to specific paths
   * @param {*} app - The instance of express which will be serving requests.
   */
  constructor(app) {
    //Throws if no instance of express was passed
    if (app == null) throw new Error("You must provide an instance of express");

    //Implementing Apollo Server
    new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => {}
    }).applyMiddleware({ app });

    // render React router
    app.get("/", (req, res) => {
      res.render("index.html");
    });

    // login mapping
    app.post("/login", (req, res) => {
      const { user_id, user_password } = req.body;
      // TODO : later you move the service logic to service
      if (!AuthService.userValidate(req)) {
        return new Error("Something went wrong");
      }

      req.session.user = AuthService.getUserInfo(undefined, {
        user_id,
        user_password
      });
      console.dir(req.session);

      // res.render("index.html");
      res.end();
    });

    // Access the session as req.session
    app.get("/test", function(req, res, next) {
      console.dir(req.session);
      if (req.session.views) {
        req.session.views++;
        res.setHeader("Content-Type", "text/html");
        res.write("<p>views: " + req.session.views + "</p>");
        res.write(
          "<p>expires in: " + req.session.cookie.maxAge / 1000 + "s</p>"
        );
        res.end();
      } else {
        req.session.views = 1;
        res.end("welcome to the session demo. refresh!");
      }
    });
  }
};
