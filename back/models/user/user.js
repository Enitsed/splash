const DAO = require("../../lib/dao");
const mySQLWrapper = require("../../lib/mySqlWrapper");
const bcrypt = require("bcrypt");
const { sequelize } = require("../");
const { DataTypes } = require("sequelize");

class User extends DAO {
  // get an sequelize object
  static get USER() {
    return sequelize.define("users", {
      user_seq: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_name: { type: DataTypes.STRING(50), allowNull: false },
      user_id: { type: DataTypes.STRING, allowNull: false },
      user_password: { type: DataTypes.STRING, allowNull: false },
      gender: { type: DataTypes.STRING(2) },
      address: { type: DataTypes.STRING },
      phone_num: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      user_status: { type: DataTypes.STRING(10), allowNull: false },
    });
  }

  /**
   * Overrides TABLE_NAME with this class' backing table at MySQL
   */
  static get TABLE_NAME() {
    return "users";
  }

  /**
   * this overrides an ID
   */
  static get PRIMARY_KEY() {
    return "user_seq";
  }

  /**
   * Returns a user by its user_seq
   */
  static async getByUserSeq(_, { user_seq }) {
    return await this.find(user_seq);
  }

  /**
   * Returns a list of users matching the passed fields
   * @param {*} fields - Fields to be matched
   */
  static async findMatching(_, fields) {
    // Returns early with all users if no criteria was passed
    if (Object.keys(fields).length === 0) return this.findAll();

    // Find matching users
    return this.findByFields({
      fields,
    });
  }

  /**
   * Creates a new user
   */
  static async createEntry(
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

    const result = await this.USER.create({
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

    // const connection = await mySQLWrapper.getConnectionFromPool();
    // try {
    // user_password = await bcrypt.hashSync(
    //   user_password,
    //   Number(process.env.SALT_ROUNDS || 10)
    // );

    // let _result = await this.insert(connection, {
    //   data: {
    //     user_name,
    //     user_id,
    //     user_password,
    //     gender,
    //     address,
    //     phone_num,
    //     email,
    //     user_status,
    //   },
    // });

    // return this.getByUserSeq(_, {
    //   user_seq: _result.insertId,
    // });

    // } finally {
    // Releases the connection
    // if (connection != null) connection.release();
    // }
  }

  /**
   * Updates a user
   */
  static async updateEntry(
    _,
    {
      user_seq,
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
    const connection = await mySQLWrapper.getConnectionFromPool();
    try {
      await this.update(connection, {
        user_seq,
        data: {
          user_name,
          user_id,
          user_password,
          gender,
          address,
          phone_num,
          email,
          user_status,
        },
      });

      return this.getByUserSeq(_, {
        user_seq,
      });
    } finally {
      // Releases the connection
      if (connection != null) connection.release();
    }
  }

  /** use sequelize */
  static findUser(email) {
    return this.USER.findOne({
      attributes: ["user_id"],
      where: {
        email: email,
      },
      order: ["createdAt", "DESC"],
      limit: 1,
    });
  }
}

module.exports = User;
