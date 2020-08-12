const { board, users } = require("../../");
const { Op } = require("sequelize");

const BoardManager = {
  /**
   * Creates a new board (sequelize)
   */
  create: function (
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
    return board
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
  },

  /**
   * Updates a board (sequelize)
   */
  modify: function (
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
    return board
      .update(
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
      )
      .then(({ dataValues }) => {
        return dataValues;
      })
      .catch((err) => err);
  },

  /**
   * remove a board (sequelize)
   */
  remove: function (_, { board_seq }) {
    return board
      .destroy({
        where: { board_seq },
      })
      .then((data) => {
        return data;
      })
      .catch((err) => err);
  },

  /** find board sequelize */
  findBoard: function (param) {
    return board
      .findOne({
        attributes: [
          "board_seq",
          "category_seq",
          "board_title",
          "board_content",
          "board_div_cd",
          "reg_id",
          "reg_ip",
          "user_seq",
          "createdAt",
          "updatedAt",
        ],
        where: param,
        include: [
          {
            model: users,
            as: "user",
            required: true,
          },
        ],
        order: [["createdAt", "DESC"]],
      })
      .then((data) => {
        return data;
      })
      .catch((err) => err);
  },

  /** find board sequelize */
  boardList: function (
    { category_seq, board_title },
    board_offset,
    board_limit
  ) {
    return board
      .findAll({
        attributes: [
          "board_seq",
          "category_seq",
          "board_title",
          "board_content",
          "board_div_cd",
          "reg_id",
          "reg_ip",
          "user_seq",
          "createdAt",
          "updatedAt",
        ],
        where: {
          category_seq,
          board_title: { [Op.like]: "%" + board_title + "%" },
        },
        include: [
          {
            model: users,
            as: "user",
            required: true,
          },
        ],
        order: [["createdAt", "DESC"]],
        offset: board_offset,
        limit: board_limit,
      })
      .then((data) => {
        return data;
      })
      .catch((err) => err);
  },
};

module.exports = BoardManager;
