const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("../../schema/schema");
const AuthRouter = require("../Auth/AuthRouter");
const jwt = require("jsonwebtoken");

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
        rootValue.ip = req.ip;

        // const token = req.session.authorization || "";
        const tempToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfc2VxIjoxMDgsInVzZXJfbmFtZSI6IjEiLCJ1c2VyX2lkIjoidGVzdDEyMyIsInVzZXJfcGFzc3dvcmQiOiIkMmIkMTAkY2JCN2RXbzdTTXMubFMyc3didXl4ZXAwaTd3NGw2dFVLYVRBWXFoaVBTd2VRZUZzN3RnemEiLCJnZW5kZXIiOiJGIiwiYWRkcmVzcyI6IjEiLCJwaG9uZV9udW0iOiIxIiwiZW1haWwiOiIxIiwidXNlcl9zdGF0dXMiOiJhY3RpdmUiLCJjcmVhdGVfdGltZSI6IjIwMjAtMDYtMDVUMDI6NTg6MDAuMDAwWiIsInNpZ251cF9yZXN1bHQiOiJzdWNjZXNzIn0sImlhdCI6MTU5MTMyNTg4MCwiZXhwIjoxNTkxMzI5NDgwLCJpc3MiOiJzcGxhc2guY29tIiwic3ViIjoidXNlckRhdGEifQ.OaGdRY9xuWLSCd9SfmVQcyOH0psurLvL72f4gm25Mbw";

        // if (!tempToken || !req.session.user) {
        //   throw new Error("Not Logged In");
        // }

        const token = jwt.verify(tempToken, app.get("jwt-secret"));
        return { user: token.user };
      },
      rootValue: rootValue,
    }).applyMiddleware({ app });

    // render React router
    app.get("/", (req, res) => {
      res.render("index.html", { userData: req.session.user });
    });

    app.get("/check", (req, res) => {
      console.dir("/check route");
      console.dir(req.session.user);
      res.redirect("/");
    });

    new AuthRouter(app);
  }
};
