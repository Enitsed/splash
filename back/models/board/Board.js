const DAO = require("../../lib/dao");
const mySQLWrapper = require("../../lib/mySqlWrapper");
const { sequelize } = require("../");
const { DataTypes } = require("sequelize");

class board extends DAO {
  // get an sequelize object
  static get Dao() {
    return sequelize.define("board", {
      board_seq: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      category_seq: { type: DataTypes.INTEGER, allowNull: false },
      board_title: { type: DataTypes.STRING(500) },
      board_content: { type: DataTypes.STRING(2000) },
      board_div_cd: { type: DataTypes.STRING(2) },
      reg_id: { type: DataTypes.STRING(255) },
      reg_ip: { type: DataTypes.STRING(45) },
      user_seq: { type: DataTypes.INTEGER },
    });
  }

  /**
   * Overrides TABLE_NAME with this class' backing table at MySQL
   */
  static get TABLE_NAME() {
    return "board";
  }

  /**
   * this overrides an ID
   */
  static get PRIMARY_KEY() {
    return "board_seq";
  }

  /**
   * Returns a board by its board_seq
   */
  static async getByBoardSeq(_, { board_seq }) {
    return await this.find(board_seq);
  }

  /**
   * Returns a list of board matching the passed fields
   * @param {*} fields - Fields to be matched
   */
  static async findMatching(_, fields) {
    // Returns early with all board if no criteria was passed
    if (Object.keys(fields).length === 0) return this.findAll();

    // Find matching board
    return this.findByFields({
      fields,
    });
  }

  /**
   * Creates a new board
   * @deprecated use "create" function instead
   */
  static async createEntry(
    _,
    {
      category_seq,
      board_title,
      board_content,
      board_div_cd,
      reg_id,
      reg_ip,
      user_seq,
    }
  ) {
    const connection = await mySQLWrapper.getConnectionFromPool();

    try {
      let _result = await this.insert(connection, {
        data: {
          category_seq,
          board_title,
          board_content,
          board_div_cd,
          reg_id,
          reg_ip,
          user_seq,
          createdAt,
          updatedAt,
        },
      });

      return this.getByBoardSeq(_, {
        board_seq: _result.insertId,
      });
    } finally {
      // Releases the connection
      if (connection != null) connection.release();
    }
  }

  /**
   * Updates a board
   * @deprecated use "modify" function instead
   */
  static async updateEntry(
    _,
    {
      board_seq,
      category_seq,
      board_title,
      board_content,
      board_div_cd,
      reg_id,
      reg_ip,
      user_seq,
      updatedAt,
    }
  ) {
    const connection = await mySQLWrapper.getConnectionFromPool();

    try {
      await this.update(connection, {
        board_seq,
        data: {
          board_seq,
          category_seq,
          board_title,
          board_content,
          board_div_cd,
          reg_id,
          reg_ip,
          user_seq,
          updatedAt,
        },
      });

      return this.getByBoardSeq(_, {
        board_seq,
      });
    } finally {
      // Releases the connection
      if (connection != null) connection.release();
    }
  }

  /**
   * Creates a new board (sequelize)
   */
  static async create(
    _,
    {
      category_seq,
      board_title,
      board_content,
      board_div_cd,
      reg_id,
      reg_ip,
      user_seq,
    }
  ) {
    const result = await this.Dao.create({
      category_seq,
      board_title,
      board_content,
      board_div_cd,
      reg_id,
      reg_ip,
      user_seq,
    })
      .then(({ dataValues }) => {
        return dataValues;
      })
      .catch((err) => err);

    return result;
  }

  /**
   * Updates a board (sequelize)
   */
  static async modify(
    _,
    {
      board_seq,
      category_seq,
      board_title,
      board_content,
      board_div_cd,
      reg_id,
      reg_ip,
      user_seq,
    }
  ) {
    this.Dao.update(
      {
        category_seq,
        board_title,
        board_content,
        board_div_cd,
        reg_id,
        reg_ip,
        user_seq,
      },
      { where: { board_seq } }
    );
  }

  /** find board sequelize */
  static findboard(param) {
    return this.Dao.find({
      attributes: ["board_seq"],
      where: param,
      order: ["createdAt", "DESC"],
    });
  }
}

module.exports = board;
