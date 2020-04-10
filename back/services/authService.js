const bcrypt = require("bcrypt");
const User = require("../models/user/user");
const Auth = require("../models/auth/authManage");

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
  /**
   * Returns a user by its user_id and password
   */
  getUserInfo: function (_, { user_id, user_password }) {
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

validateId = function (id) {
  return false;
};
validatePassword = function (password) {
  return false;
};

module.exports = authService;
