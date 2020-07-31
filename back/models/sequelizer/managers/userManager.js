const bcrypt = require("bcrypt");
const { users } = require("../../");

const UserManager = {
  /**
   * Creates a new user (sequelize)
   */
  create: async function (
    _,
    {
      user_name,
      user_id,
      user_password,
      gender,
      address,
      phone_num,
      email,
      user_status,
    }
  ) {
    user_password = await bcrypt.hashSync(
      user_password,
      Number(process.env.SALT_ROUNDS || 10)
    );

    const result = await users
      .create({
        user_name,
        user_id,
        user_password,
        gender,
        address,
        phone_num,
        email,
        user_status,
      })
      .then(({ dataValues }) => {
        return dataValues;
      })
      .catch((err) => err);

    return result;
  },

  /**
   * Updates a user (sequelize)
   */
  modify: async function (
    _,
    {
      user_seq,
      user_name,
      user_password,
      gender,
      address,
      phone_num,
      email,
      user_status,
    }
  ) {
    user_password = await bcrypt.hashSync(
      user_password,
      Number(process.env.SALT_ROUNDS || 10)
    );

    users.update(
      {
        user_name,
        user_password,
        gender,
        address,
        phone_num,
        email,
        user_status,
      },
      { where: { user_seq } }
    );
  },

  /** find User sequelize
   * @param : Object = find matching keys
   * @attr : Array = get wanted attributes
   */
  findUser: function (param, attr) {
    return users.findOne({
      attributes: attr,
      where: param,
      order: [["createdAt", "DESC"]],
    });
  },
};

module.exports = UserManager;
