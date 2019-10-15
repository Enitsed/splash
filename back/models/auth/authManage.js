const DAO = require("../../lib/dao");
const mySQLWrapper = require("../../lib/mySqlWrapper");

class authManage extends DAO {
  /**
   * Overrides TABLE_NAME with this class' backing table at MySQL
   */
  static get TABLE_NAME() {
    return "login_history";
  }

  /**
   * this overrides an ID
   */
  static get PRIMARY_KEY() {
    return "seq";
  }

  /**
   * Returns a login_history by its seq
   */
  static async getByauthManageSeq(_, { seq }) {
    return await this.find(seq);
  }

  /**
   * Returns a list of login_historys matching the passed fields
   * @param {*} fields - Fields to be matched
   */
  static async findMatching(_, fields) {
    // Returns early with all login_historys if no criteria was passed
    if (Object.keys(fields).length === 0) return this.findAll();

    // Find matching login_historys
    return this.findByFields({
      fields
    });
  }

  /**
   * Creates a new login_history
   */
  static async createEntry(
    _,
    { user_num, login_ip, login_date, login_status, seq }
  ) {
    const connection = await mySQLWrapper.getConnectionFromPool();
    try {
      let _result = await this.insert(connection, {
        data: {
          user_num,
          login_ip,
          login_date,
          login_status,
          seq
        }
      });

      return this.getByauthManageSeq(_, { seq: _result.insertId });
    } finally {
      // Releases the connection
      if (connection != null) connection.release();
    }
  }

  /**
   * Updates a login_history
   */
  static async updateEntry(
    _,
    { user_num, login_ip, login_date, login_status, seq }
  ) {
    const connection = await mySQLWrapper.getConnectionFromPool();
    try {
      await this.update(connection, {
        seq,
        data: {
          user_num,
          login_ip,
          login_date,
          login_status,
          seq
        }
      });

      return this.getByauthManageSeq(_, { seq });
    } finally {
      // Releases the connection
      if (connection != null) connection.release();
    }
  }
}

module.exports = authManage;
