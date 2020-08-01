const { category } = require("../../");

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
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.error(err);
      });
  },

  /** find category sequelize */
  findOneCategory: function (param) {
    return category.findOne({
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
      order: [["category_seq", "ASC"]],
    });
  },

  /** find category sequelize */
  findCategory: function (param) {
    return category.findAll({
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
      order: [["category_seq", "ASC"]],
    });
  },
};

module.exports = CategoryManager;
