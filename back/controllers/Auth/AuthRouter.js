const AuthService = require("../../services/authService");
const jwt = require("jsonwebtoken");

module.exports = class AuthRouter {
  constructor(app) {
    // signUp mapping
    app.post("/signUp", async (req, res) => {
      if (req.session.user) {
        console.dir(req.cookies.user);
        return res.json(req.session.user);
      }

      const {
        user_name,
        user_id,
        user_password,
        gender,
        address,
        phone_num,
        email,
      } = req.body.variables;

      await AuthService.signUpUserInfo(
        { ip: req.ip },
        {
          user_name,
          user_id,
          user_password,
          gender,
          address,
          phone_num,
          email,
        }
      )
        .then((data) => {
          const encodedUserData = jwt.sign(
            { user: { ...data } },
            req.app.get("jwt-secret"),
            {
              expiresIn: "1h",
              issuer: "splash.com",
              subject: "userData",
            }
          );

          req.session.user = data;
          return res
            .cookie("user", encodedUserData, { maxAge: 10800 })
            .json(req.session.user);
        })
        .catch((err) => {
          console.error(err);
        });
    });

    // login mapping
    app.post("/login", async (req, res) => {
      if (req.session.user && req.cookies.user) {
        return res.redirect("/cookieLogin");
      }

      const { user_id, user_password } = req.body.variables;

      await AuthService.getUserInfo(
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
        req.session.user = data;
        return res
          .cookie("user", encodedUserData, { maxAge: 10800 })
          .json(req.session.user);
      });
    });

    // cookie login mapping
    app.post("/cookieLogin", async (req, res) => {
      if (req.session.user && req.cookies.user) {
        return res.json(req.session.user);
      }

      return res.redirect("/");
    });
  }
};
