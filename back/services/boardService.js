const BoardManager = require("../models/sequelizer/managers/boardManager");
const Constants = require("../models/common/Constants");
const Result = require("../models/common/Result");

const BoardService = {
  /** 게시글 조회 */
  findBoard: function (_, param) {
    return BoardManager.findOneBoard(param);
  },

  /** 게시글 조회(목록) */
  boardList: function (_, param) {
    return BoardManager.findboard(param);
  },

  /** 게시글 작성 */
  writeBoard: function (_, param) {
    const {
      category_seq,
      board_title,
      board_content,
      board_div_cd,
      user_seq,
    } = param;

    return BoardManager.create(_, {
      category_seq,
      board_title,
      board_content,
      board_div_cd,
      reg_id: _.user_id,
      reg_ip: _.ip,
      user_seq,
    });
  },
};

module.exports = BoardService;
