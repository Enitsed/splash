const CategoryManager = require("../models/sequelizer/managers/categoryManager");
const Constants = require("../models/common/Constants");
const Result = require("../models/common/Result");

const CategoryService = {
  /** 카테고리 조회 */
  categoryList: function (_, { category_lvl, category_offset }) {
    const category_limit = 10;
    const board_limit = 5;

    return CategoryManager.findCategoryList(
      { category_lvl },
      category_offset,
      category_limit,
      board_limit
    );
  },

  /** 카테고리 조회 */
  findCategory: function (_, { category_seq, board_limit }) {
    return CategoryManager.findOneCategory({ category_seq, board_limit });
  },

  /** 카테고리 추가 */
  addCategory: function (
    _,
    { category_name, category_lvl, parent_category_seq }
  ) {
    return CategoryManager.create(_, {
      category_name,
      category_lvl,
      parent_category_seq,
      reg_id: _.reg_id,
      reg_ip: _.ip,
    });
  },

  /** 카테고리 삭제 */
  removeCategory: function (_, { category_seq }) {
    return CategoryManager.remove(_, {
      category_seq,
    }).then((result) => {
      return result === 1
        ? new Result(
            Constants.RESULT_CODE.SUCCESS,
            Constants.RESULT_MESSAGE.SUCCESS
          )
        : new Result(
            Constants.ERROR_CODE._NO_DATA_EXIST,
            Constants.ERROR_MESSAGE._NO_DATA_EXIST
          );
    });
  },
};

module.exports = CategoryService;
