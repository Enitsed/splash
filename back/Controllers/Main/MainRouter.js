const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("../../schema/schema");
const AuthRouter = require("../Auth/AuthRouter");
const BoardRouter = require("../Board/BoardRouter");
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

        const token = req.cookies.user || req.session.user || "";

        if (token || req.session.user || req.cookies.user) {
          const userJwt = jwt.verify(token, app.get("jwt-secret"));

          rootValue.reg_id = req.session.user.user_id;

          if (req.session.user.user_password !== userJwt.user.user_password) {
            throw new Error("세션 유저 데이터와 일치하지 않는 쿠키 데이터");
          }

          return { user: req.session.user };
        }
      },
      rootValue: rootValue,
      playground: {
        settings: {
          "request.credentials": "include",
        },
      },
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
    new BoardRouter(app);
  }
};
