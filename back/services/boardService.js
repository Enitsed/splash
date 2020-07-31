const BoardManager = require("../models/sequelizer/managers/boardManager");
const Constants = require("../models/common/Constants");
const Result = require("../models/common/Result");

const BoardService = {
  /** 게시글 조회 */
  boardList: function () {},
  /** 게시글 조회 */
  findBoard: function (_, param) {},

  /** 게시글 작성 */
  writeBoard: function (_, param) {
    BoardManager.create(_, param);
  },
};

module.exports = BoardService;
