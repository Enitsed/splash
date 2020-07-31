const DAO = require("../../lib/dao");
const mySQLWrapper = require("../../lib/mySqlWrapper");
const bcrypt = require("bcrypt");

class User extends DAO {
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
   * @deprecated use "create" function instead
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
    const connection = await mySQLWrapper.getConnectionFromPool();

    try {
      user_password = await bcrypt.hashSync(
        user_password,
        Number(process.env.SALT_ROUNDS || 10)
      );

      let _result = await this.insert(connection, {
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
        user_seq: _result.insertId,
      });
    } finally {
      // Releases the connection
      if (connection != null) connection.release();
    }
  }

  /**
   * Updates a user
   * @deprecated use "modify" function instead
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
      user_password = await bcrypt.hashSync(
        user_password,
        Number(process.env.SALT_ROUNDS || 10)
      );

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
}

module.exports = User;
