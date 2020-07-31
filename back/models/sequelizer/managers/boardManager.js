const { board } = require("../../");

const BoardManager = {
  /**
   * Creates a new board (sequelize)
   */
  create: async function (
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
    const result = await board
      .create({
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
  },

  /**
   * Updates a board (sequelize)
   */
  modify: async function (
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
    board.update(
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
  },

  /** find board sequelize */
  findboard: function (param) {
    return board.find({
      attributes: ["board_seq"],
      where: param,
      order: ["createdAt", "DESC"],
    });
  },
};

module.exports = BoardManager;
