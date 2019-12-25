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
  static async getByUserSeq(_, {
    user_seq
  }) {
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
    _, {
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
      await bcrypt.hash(user_password, 10).then(resolve => {
        user_password = resolve;
      });

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

      return this.getByUserSeq(_, {
        user_seq: _result.insertId
      });
    } finally {
      // Releases the connection
      if (connection != null) connection.release();
    }
  }

  /**
   * Updates a user
   */
  static async updateEntry(
    _, {
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

      return this.getByUserSeq(_, {
        user_seq
      });
    } finally {
      // Releases the connection
      if (connection != null) connection.release();
    }
  }

  /**
   * Returns a user by its user_id and password
   */
  static async getUserInfo(_, {
    user_id,
    user_password
  }) {
    let fields = {
      user_id,
      user_password
    };
    let user_seq = await this.findByFields({
      fields
    }).then(result => {
      if (result.length < 1) {
        throw new Error("user not found");
      }

      if (result.length > 1) {
        throw new Error("duplicated User Exists");
      }

      return result.shift().user_seq;
    });

    return await this.getByUserSeq(_, {
      user_seq
    });
  }
}

module.exports = User;