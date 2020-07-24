const bcrypt = require("bcrypt");
const User = require("../models/user/user");
const Auth = require("../models/auth/authManage");
const Constants = require("../models/common/Constants");
const Result = require("../models/common/Result");

const AuthService = {
  // check user data is wrong or not
  userValidate: function (user_id, user_password) {
    if (checkIfEmpty([user_id, user_password])) {
      return false;
    }

    if (!validateId(user_id)) {
      // TODO : 정규식표현추가
      return false;
    }

    if (!validatePassword(user_password)) {
      // TODO : 정규식표현추가
      return false;
    }

    return true;
  },

  // sign up service
  signUpUserInfo: async function (
    _,
    { user_name, user_id, user_password, gender, address, phone_num, email }
  ) {
    if (checkIfEmpty([user_name, user_id, user_password, gender, email])) {
      return new Result(
        Constants.ERROR_CODE._NECESSARY_INPUT_NEEDED,
        Constants.ERROR_MESSAGE._NECESSARY_INPUT_NEEDED
      );
    }

    return await this.findDuplicate(_, { user_id, email })
      .then((data) => {
        if (data && data.length) {
          return new Result(
            Constants.ERROR_CODE._ALREADY_USED,
            Constants.ERROR_MESSAGE._ALREADY_USED
          );
        }

        const sign_up_result = User.create(_, {
          user_name,
          user_id,
          user_password,
          gender,
          address,
          phone_num,
          email,
          user_status: Constants.USER_STATUS.ACTIVE,
        });

        return sign_up_result;
      })
      .catch((err) => {
        console.error(err);
      });
  },
  /**
   * Returns a user by its user_id and password
   */
  getUserInfo: async function (_, { user_id, user_password }) {
    if (!validateId(user_id)) {
      return {
        login_history: {
          login_status: Constants.RESULT_MESSAGE.FAIL,
          msg: "type user id",
        },
      };
    }

    if (!validatePassword(user_password)) {
      return {
        login_history: {
          login_status: Constants.RESULT_MESSAGE.FAIL,
          msg: "type user password",
        },
      };
    }

    const login_result = await User.findByFields({
      fields: { user_id },
    })
      .then((result) => {
        if (!result || result.length < 1) {
          throw new Error("No user exists");
        }
        const userData = result.shift();

        const password_check_result = bcrypt.compareSync(
          user_password,
          userData.user_password
        );

        // Connect Logs
        Auth.createEntry(_, {
          user_num: userData.user_seq,
          login_ip: _.ip,
          login_status: password_check_result
            ? Constants.RESULT_MESSAGE.SUCCESS
            : Constants.RESULT_MESSAGE.FAIL,
        });

        // when failed to login
        if (!password_check_result) {
          throw new Error("Password Incorrect");
        }

        // TODO: Look up user if the user exists in Admin Table.

        // return userData
        return userData;
      })
      .catch((err) => {
        console.log(err);
      });

    return login_result;
  },
  findId: function (_, { email }) {
    return User.findUser({ email: email }, ["user_id"])
      .then((data) => {
        if (!data) {
          return new Result(
            Constants.ERROR_CODE._NO_DATA_EXIST,
            Constants.ERROR_MESSAGE._NO_DATA_EXIST
          );
        }
        return data;
      })
      .catch((err) => console.log(err));
  },
  /**
   * find password
   * @param {context} _ : object has ip
   * @param {parameter} object has key for "user_id"
   * @return email
   */
  findPassword: function (_, { user_id }) {
    return User.findUser({ user_id: user_id }, ["email"])
      .then((data) => {
        if (!data) {
          return new Result(
            Constants.ERROR_CODE._NO_DATA_EXIST,
            Constants.ERROR_MESSAGE._NO_DATA_EXIST
          );
        }
        return data;
      })
      .catch((err) => console.log(err));
  },
  findDuplicate: function (_, { user_id, email }) {
    return User.findByFields({ fields: { user_id } })
      .then((data) => {
        if (data && data.length) {
          return new Result(
            Constants.ERROR_CODE._ALREADY_USED,
            "해당 아이디는 이미 사용 중입니다."
          );
        }

        return User.findByFields({ fields: { email } })
          .then((data) => {
            if (data && data.length) {
              return new Result(
                Constants.ERROR_CODE._ALREADY_USED,
                "이미 등록된 이메일입니다."
              );
            }

            return new Result(
              Constants.RESULT_CODE.SUCCESS,
              Constants.RESULT_MESSAGE.SUCCESS
            );
          })
          .catch((err) => {
            return err;
          });
      })
      .catch((err) => {
        return err;
      });
  },
  // TODO : 회원 정보 바꾸는 메서드 필요함.
};

const validateId = function (id) {
  if (!id) {
    return false;
  }
  return true;
};
const validatePassword = function (password) {
  if (!password) {
    return false;
  }
  return true;
};
const checkIfEmpty = (params) => {
  for (const param of params) {
    if (!param) {
      return true;
    }
  }
  return false;
};

module.exports = AuthService;
