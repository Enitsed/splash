const bcrypt = require("bcrypt");
const User = require("../models/user/user");
const Auth = require("../models/auth/authManage");
const Constants = require("../models/common/Constants");

const authService = {
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
    if (
      checkIfEmpty([
        user_name,
        user_id,
        user_password,
        gender,
        address,
        phone_num,
        email,
      ])
    ) {
      return {
        signup_result: "necessary input field is required",
      };
    }
    await User.findMatching(_, { user_id })
      .then((res) => {
        if (res.shift() || res.length > 0) {
          throw new Error("user id already exists");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });

    const sign_up_result = await User.createEntry(_, {
      user_name,
      user_id,
      user_password,
      gender,
      address,
      phone_num,
      email,
      user_status: Constants.USER_STATUS.ACTIVE,
      create_time: new Date(),
      signup_result: Constants.SIGNUP_RESULT.SUCCESS,
    });
    return sign_up_result;
  },
  /**
   * Returns a user by its user_id and password
   */
  getUserInfo: function (_, { user_id, user_password }) {
    if (!validateId(user_id)) {
      return {
        login_history: {
          login_status: Constants.LOGIN_RESULT.FAIL,
          msg: "type user id",
        },
      };
    }

    if (!validatePassword(user_password)) {
      return {
        login_history: {
          login_status: Constants.LOGIN_RESULT.FAIL,
          msg: "type user password",
        },
      };
    }

    const login_result = User.findByFields({
      fields: { user_id },
    })
      .then((result) => {
        if (!this.userValidate(user_id, user_password)) {
          throw new Error("Invalid Credentials. Please try again.");
        }

        if (!result || result.length < 1) {
          throw new Error("No user exists");
        }
        const userData = result.shift();

        const password_check_result = bcrypt.compareSync(
          user_password,
          userData.user_password
        );

        // when failed to login
        if (!password_check_result) {
          Auth.createEntry(_, {
            user_num: userData.user_seq,
            login_ip: _.ip,
            login_date: new Date(),
            login_status: Constants.LOGIN_RESULT.FAIL,
          });
          throw new Error("Password Incorrect");
        }

        // when login succesfully
        Auth.createEntry(_, {
          user_num: userData.user_seq,
          login_ip: _.ip,
          login_date: new Date(),
          login_status: Constants.LOGIN_RESULT.SUCCESS,
        });

        // return userData
        return userData;
      })
      .catch((err) => console.log(err));

    return login_result;
  },
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

module.exports = authService;
