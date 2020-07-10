const AuthService = require("../../services/authService");
const jwt = require("jsonwebtoken");
const Constants = require("../../models/common/Constants");
const Result = require("../../models/common/Result");

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
        return res.json(
          new Result(
            Constants.ERROR_CODE._NECESSARY_INPUT_NEEDED,
            Constants.ERROR_MESSAGE._NECESSARY_INPUT_NEEDED
          )
        );
      }

      // 회원 가입전 해당 이메일로 가입 여부 조회
      // 이상 없을 경우 아무것도 반환하지 않는다.
      await AuthService.findDuplicate({ ip: req.ip }, { user_id, email })
        .then((result) => {
          if (result.statusCode !== Constants.RESULT_CODE.SUCCESS) {
            return res.json(result);
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
              if (!data || data.errorCode) {
                return res.json(data);
              } else {
                req.session.user = data;

                const encodedUserData = jwt.sign(
                  { user: { ...req.session.user } },
                  req.app.get("jwt-secret"),
                  Constants.JWT_TOKEN_OPTION
                );

                return res
                  .cookie("user", encodedUserData, Constants.COOKIE_OPTION)
                  .json(req.session.user);
              }
            })
            .catch((err) => {
              console.error(err);
              return res.json(err);
            });
        })
        .catch((err) => {
          console.error(err);
          return res.json(err);
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
          if (!data) {
            return res.json(
              new Result(
                Constants.ERROR_CODE._NO_VALID_USER_EXIST,
                Constants.ERROR_MESSAGE._NO_VALID_USER_EXIST
              )
            );
          }

          const encodedUserData = jwt.sign(
            { user: { ...data } },
            req.app.get("jwt-secret"),
            Constants.JWT_TOKEN_OPTION
          );

          req.session.user = data;

          // 임시로 관리자 지정 후에 디비 테이블 만들어서 관리할것
          // req.session.user.isAdmin = true;

          return res
            .cookie("user", encodedUserData, Constants.COOKIE_OPTION)
            .json(req.session.user);
        })
        .catch((err) => {
          console.error(err);
        });
    });

    // cookie login mapping
    app.post("/cookieLogin", (req, res) => {
      if (req.session.user && req.cookies.user) {
        const userJwt = jwt.verify(req.cookies.user, app.get("jwt-secret"));
        if (req.session.user.user_password !== userJwt.user.user_password) {
          return res.json(
            new Result(
              Constants.ERROR_CODE._NO_VALID_USER_EXIST,
              Constants.ERROR_MESSAGE._NO_VALID_USER_EXIST
            )
          );
        }

        return res.json(req.session.user);
      }

      return res.json(null);
    });

    // find Id mapping
    app.post("/findId", (req, res) => {
      const { email } = req.body.variables;

      AuthService.findId({ ip: req.ip }, { email })
        .then((data) => {
          if (!data) {
            return res.json(
              new Result(
                Constants.ERROR_CODE._NO_DATA_EXIST,
                Constants.ERROR_MESSAGE._NO_DATA_EXIST
              )
            );
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
      req.session.destroy();
      return res
        .clearCookie("user")
        .json(
          new Result(
            Constants.RESULT_CODE.SUCCESS,
            "성공적으로 로그아웃 되었습니다."
          )
        );
    });
  }
};
