const { category, board, users } = require("../../");

const CategoryManager = {
  /**
   * Creates a new category (sequelize)
   */
  create: function (
    _,
    { category_name, category_lvl, parent_category_seq, reg_id, reg_ip }
  ) {
    return category
      .create({
        category_name,
        category_lvl,
        parent_category_seq,
        reg_id,
        reg_ip,
      })
      .then(({ dataValues }) => {
        return dataValues;
      })
      .catch((err) => err);
  },

  /**
   * Updates a category (sequelize)
   */
  modify: function (
    _,
    {
      category_seq,
      category_name,
      category_lvl,
      parent_category_seq,
      reg_id,
      reg_ip,
    }
  ) {
    return category
      .update(
        {
          category_name,
          category_lvl,
          parent_category_seq,
          reg_id,
          reg_ip,
        },
        { where: { category_seq } }
      )
      .then(({ dataValues }) => {
        return dataValues;
      })
      .catch((err) => err);
  },

  /***
   * Remove a category
   */
  remove: function (_, { category_seq }) {
    return category
      .destroy({
        where: { category_seq },
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.error(err);
      });
  },

  /** find category sequelize */
  findOneCategory: function ({ category_seq, board_limit }) {
    return category
      .findOne({
        attributes: [
          "category_seq",
          "category_name",
          "category_lvl",
          "parent_category_seq",
          "reg_id",
          "reg_ip",
          "createdAt",
          "updatedAt",
        ],
        where: { category_seq },
        include: [
          {
            model: board,
            as: "listOfBoard", // alias
            required: false,
            limit: board_limit,
            include: [
              {
                model: users,
                as: "user",
                required: true,
              },
            ],
          },
          { model: category, as: "childCategory" },
        ],
        order: [["category_seq", "ASC"]],
      })
      .then((data) => {
        return data;
      })
      .catch((err) => err);
  },

  /** find category sequelize */
  findCategoryList: function (
    param,
    category_offset,
    category_limit,
    board_limit
  ) {
    return category
      .findAll({
        attributes: [
          "category_seq",
          "category_name",
          "category_lvl",
          "parent_category_seq",
          "reg_id",
          "reg_ip",
          "createdAt",
          "updatedAt",
        ],
        where: param,
        include: [
          {
            model: board,
            attributes: [
              "board_seq",
              "category_seq",
              "board_title",
              "board_content",
              "user_seq",
            ],
            as: "listOfBoard", // alias
            limit: board_limit,
            include: [
              {
                model: users,
                attributes: ["user_seq", "user_id"],
                as: "user",
              },
            ],
          },
          {
            model: category,
            as: "childCategory",
          },
        ],
        order: [["category_seq", "ASC"]],
        offset: category_offset,
        limit: category_limit,
      })
      .then((data) => {
        return data;
      })
      .catch((err) => err);
  },
};

module.exports = CategoryManager;
