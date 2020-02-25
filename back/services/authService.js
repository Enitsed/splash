const bcrypt = require("bcrypt");
const User = require("../models/user/user");
const authService = {
  // check user data is wrong or not
  userValidate: function(req) {
    const { user_id, user_password } = req.body;

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
  getUserInfo: async function(_, { user_id, user_password }) {
    const fields = {
      user_id
    };

    const user_data = await User.findByFields({
      fields
    })
      .then(result => {
        if (!result || result.length < 1) {
          throw new Error("No user exists");
        }

        const userData = result.shift();

        const password_check_result = bcrypt.compareSync(
          user_password,
          userData.user_password
        );

        if (!password_check_result) {
          throw new Error("Password Incorrect");
        }

        return userData;
      })
      .catch(err => console.log(err));
    return user_data;
  }
};

validateId = function(id) {
  return false;
};
validatePassword = function(password) {
  return false;
};

module.exports = authService;
