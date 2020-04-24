const bcrypt = require("bcrypt");
const User = require("../models/user/user");
const Auth = require("../models/auth/authManage");
const Constants = require("../models/common/Constants");

const authService = {
  // check user data is wrong or not
  userValidate: function (user_id, user_password) {
    if (validateId(user_id)) {
      return false;
    }

    if (validatePassword(user_password)) {
      return false;
    }

    return true;
  },
  // sign up service
  signUpUserInfo: async function (
    _,
    { user_name, user_id, user_password, gender, address, phone_num, email }
  ) {
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
    });
    return sign_up_result;
  },
  /**
   * Returns a user by its user_id and password
   */
  getUserInfo: function (_, { user_id, user_password }, context) {
    if (validateId(user_id)) {
      return { login_history: { login_status: "type user id" } };
    }

    if (validatePassword(user_password)) {
      return { login_history: { login_status: "type user password" } };
    }

    const login_result = User.findByFields({
      fields: { user_id },
    })
      .then((result) => {
        if (!this.userValidate(user_id, user_password)) {
          return new Error("Invalid Credentials. Please try again.");
        }

        if (!result || result.length < 1) {
          return new Error("No user exists");
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
            login_status: "failed",
          });
          return new Error("Password Incorrect");
        }

        // when login succesfully
        Auth.createEntry(_, {
          user_num: userData.user_seq,
          login_ip: _.ip,
          login_date: new Date(),
          login_status: "success",
        });

        return userData;
      })
      .catch((err) => console.log(err));

    return login_result;
  },
};

const validateId = function (id) {
  if (!id) {
    return true;
  }
  return false;
};
const validatePassword = function (password) {
  if (!password) {
    return true;
  }
  return false;
};

module.exports = authService;
