const AuthService = require("../../services/authService");
const jwt = require("jsonwebtoken");
const Constants = require("../../models/common/Constants");

module.exports = class AuthRouter {
  constructor(app) {
    // signUp mapping
    app.post("/signUp", async (req, res) => {
      if (req.session.user && req.cookies.user) {
        return res.redirect("/cookieLogin");
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
              expiresIn: Constants.JWT_TOKEN._EXPIRES_TIME,
              issuer: Constants.JWT_TOKEN._ISSUER,
              subject: Constants.JWT_TOKEN._SUBJECT,
            }
          );

          req.session.user = data;
          return res
            .cookie("user", encodedUserData, {
              maxAge: Constants.COOKIE._MAX_AGE,
            })
            .json(req.session.user);
        })
        .catch((err) => {
          console.error(err);
        });
    });

    // login mapping
    app.post("/login", (req, res) => {
      if (req.session.user && req.cookies.user) {
        return res.redirect("/cookieLogin");
      }

      const { user_id, user_password } = req.body.variables;

      AuthService.getUserInfo(
        { ip: req.ip },
        {
          user_id,
          user_password,
        }
      )
        .then((data) => {
          const encodedUserData = jwt.sign(
            { user: { ...data } },
            req.app.get("jwt-secret"),
            {
              expiresIn: Constants.JWT_TOKEN._EXPIRES_TIME,
              issuer: Constants.JWT_TOKEN._ISSUER,
              subject: Constants.JWT_TOKEN._SUBJECT,
            }
          );
          req.session.user = data;
          // 임시로 관리자 지정 후에 디비 테이블 만들어서 관리할것
          // req.session.user.isAdmin = true;

          return res
            .cookie("user", encodedUserData, {
              maxAge: Constants.COOKIE._MAX_AGE,
            })
            .json(req.session.user);
        })
        .catch((err) => console.error(err));
    });

    // cookie login mapping
    app.post("/cookieLogin", (req, res) => {
      if (req.session.user && req.cookies.user) {
        const userJwt = jwt.verify(req.cookies.user, app.get("jwt-secret"));
        if (req.session.user.user_password !== userJwt.user.user_password) {
          throw new Error("세션 유저 데이터와 일치하지 않는 쿠키 데이터");
        }
        return res.json(req.session.user);
      }

      return res.redirect("/");
    });

    // expire session cookie
    app.post("/logout", (req, res) => {
      req.session.user = null;
      res.cookie("user", null, { maxAge: 1 });

      return res.redirect("/");
    });
  }
};
