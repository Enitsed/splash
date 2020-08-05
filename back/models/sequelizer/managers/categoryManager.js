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
  findOneCategory: function (param) {
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
        where: param,
        include: [
          {
            model: board,
            as: "listOfBoard", // alias
            include: [
              {
                model: users,
                as: "user",
                required: true,
              },
            ],
          },
        ],
        order: [["category_seq", "ASC"]],
      })
      .then((data) => {
        return data;
      })
      .catch((err) => err);
  },

  /** find category sequelize */
  findCategory: function (param, offset, limit) {
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
            as: "listOfBoard", // alias
            include: [
              {
                model: users,
                as: "user",
                required: true,
              },
            ],
          },
        ],
        order: [["category_seq", "ASC"]],
        offset: offset,
        limit: limit,
      })
      .then((data) => {
        return data;
      })
      .catch((err) => err);
  },
};

module.exports = CategoryManager;
