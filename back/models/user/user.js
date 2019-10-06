const DAO = require("../../lib/dao");
const mySQLWrapper = require("../../lib/mySqlWrapper");

class User extends DAO {
  /**
   * Overrides TABLE_NAME with this class' backing table at MySQL
   */
  static get TABLE_NAME() {
    return "user";
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
      fields
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
      create_time
    }
  ) {
    const connection = await mySQLWrapper.getConnectionFromPool();
    try {
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
          create_time
        }
      });

      return this.getByUserSeq(_, { user_seq: _result.insertId });
    } finally {
      // Releases the connection
      if (connection != null) connection.release();
    }
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
      create_time
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
          create_time
        }
      });

      return this.getByUserSeq(_, { user_seq });
    } finally {
      // Releases the connection
      if (connection != null) connection.release();
    }
  }
}

module.exports = User;
