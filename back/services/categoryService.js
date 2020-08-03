const CategoryManager = require("../models/sequelizer/managers/categoryManager");
const Constants = require("../models/common/Constants");
const Result = require("../models/common/Result");
const BoardService = require("./boardService");

const CategoryService = {
  /** 카테고리 조회 */
  categoryList: async function (_, { category_lvl, offset }) {
    let limit = 10;

    return await CategoryManager.findCategory({ category_lvl }, offset, limit)
      .then((data) => {
        return data.map(({ dataValues }) => {
          const listOfBoard = BoardService.boardList(_, {
            category_seq: dataValues.category_seq,
            limit: 5,
          })
            .then((boardData) => {
              return boardData;
            })
            .catch((err) => console.error(err));
          return { ...dataValues, listOfBoard };
        });
      })
      .catch((err) => console.error(err));
  },

  /** 카테고리 조회 */
  findCategory: async function (_, param) {
    return await CategoryManager.findOneCategory(param)
      .then(async (data) => {
        const { dataValues } = data;
        const listOfBoard = await BoardService.boardList(_, {
          category_seq: dataValues.category_seq,
        })
          .then((boardData) => {
            return boardData;
          })
          .catch((err) => console.error(err));
        return { ...dataValues, listOfBoard };
      })
      .catch((err) => console.error(err));
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
