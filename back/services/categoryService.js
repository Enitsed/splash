const CategoryManager = require("../models/sequelizer/managers/categoryManager");
const Constants = require("../models/common/Constants");
const Result = require("../models/common/Result");

const CategoryService = {
  /** 카테고리 조회 */
  categoryList: function (_, param) {
    return CategoryManager.findCategory(param);
  },
  /** 카테고리 조회 */
  findCategory: function (_, param) {},

  /** 카테고리 추가 */
  addCategory: function (
    _,
    { category_seq, category_name, category_lvl, parent_category_seq }
  ) {
    return CategoryManager.create(_, {
      category_seq,
      category_name,
      category_lvl,
      parent_category_seq,
      reg_id: _.reg_id,
      reg_ip: _.ip,
    });
  },
};

module.exports = CategoryService;
