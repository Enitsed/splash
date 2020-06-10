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

      if (!user_name || !user_id || !user_password || !gender || !email) {
        return res.json({ error: "필수 입력란을 기입해주세요." });
      }

      // 회원 가입전 해당 이메일로 가입 여부 조회
      await AuthService.findId({ ip: req.ip }, { email })
        .then((data) => {
          if (data) {
            return res.json({ error: "이미 등록된 이메일입니다." });
          }

          // 회원가입 처리
          AuthService.signUpUserInfo(
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
              console.log(data);
              if (!data || data.error) {
                return res.json(data);
              } else {
                req.session.user = data;

                const encodedUserData = jwt.sign(
                  { user: { ...req.session.user } },
                  req.app.get("jwt-secret"),
                  {
                    expiresIn: Constants.JWT_TOKEN._EXPIRES_TIME,
                    issuer: Constants.JWT_TOKEN._ISSUER,
                    subject: Constants.JWT_TOKEN._SUBJECT,
                  }
                );

                return res
                  .cookie("user", encodedUserData, {
                    maxAge: Constants.COOKIE._MAX_AGE,
                  })
                  .json(req.session.user);
              }
            })
            .catch((err) => {
              console.error(err);
            });
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

    // find Id mapping
    app.post("/findId", (req, res) => {
      const { email } = req.body.variables;

      AuthService.findId({ ip: req.ip }, { email })
        .then((data) => {
          if (!data) {
            return res.json({ error: "해당 유저가 존재하지 않습니다." });
          } else {
            return res.json(data.user_id);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    });

    // find Password mapping
    app.post("/findPassword", (req, res) => {
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
