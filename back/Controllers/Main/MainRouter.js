const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("../../schema/schema");
const AuthService = require("../../services/authService");
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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfc2VxIjo5NSwidXNlcl9uYW1lIjoianVuZSIsInVzZXJfaWQiOiIzMyIsInVzZXJfcGFzc3dvcmQiOiIkMmIkMTAkaUZPbFN2cEV5VVlxdHZVYS9uOUJLdVhCQldxallMRHdsNFRPQ3c5UUlzZzIuT3EvVVd4NWUiLCJnZW5kZXIiOiIiLCJhZGRyZXNzIjoiYWEiLCJwaG9uZV9udW0iOiIwMTAtMjEyMS0zMzExIiwiZW1haWwiOiJkbGRAbmF2ZXIuY29tIiwidXNlcl9zdGF0dXMiOiJhY3RpdmUiLCJjcmVhdGVfdGltZSI6IjIwMjAtMDUtMTVUMDk6NDQ6MDAuMDAwWiIsInNpZ251cF9yZXN1bHQiOiJzdWNjZXNzIn0sImlhdCI6MTU5MTI3MDYyMywiZXhwIjoxNTkxMjc0MjIzLCJpc3MiOiJzcGxhc2guY29tIiwic3ViIjoidXNlckRhdGEifQ.bT-FIAsBMFpZbhU5BuTf1J5K5zrwqsPvugcjmkYyicQ";

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
      console.dir(req.session.user);
      res.redirect("/");
    });

    // login mapping
    app.post("/login", async (req, res) => {
      if (req.session.user) {
        res.redirect("/check");
        return;
      }

      const { user_id, user_password } = req.body.variables;

      AuthService.getUserInfo(
        { ip: req.ip },
        {
          user_id,
          user_password,
        }
      ).then((data) => {
        const encodedUserData = jwt.sign(
          { user: { ...data } },
          req.app.get("jwt-secret"),
          {
            expiresIn: "1h",
            issuer: "splash.com",
            subject: "userData",
          }
        );
        req.session.user = encodedUserData;
        console.log(encodedUserData);
      });

      res.json(req.session.user);
    });
  }
};
