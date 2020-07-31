const { category } = require("../../");

const CategoryManager = {
  /**
   * Creates a new category (sequelize)
   */
  create: function (
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
      .create({
        category_seq,
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
          category_seq,
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
  findcategory: function (param) {
    return category.find({
      attributes: ["category_seq"],
      where: param,
      order: ["createdAt", "DESC"],
    });
  },
};

module.exports = CategoryManager;
