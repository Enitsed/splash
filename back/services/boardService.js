const BoardManager = require("../models/sequelizer/managers/boardManager");
const Constants = require("../models/common/Constants");
const Result = require("../models/common/Result");

const BoardService = {
  /** 게시글 조회 */
  findBoard: function (_, param) {
    return BoardManager.findBoard(param);
  },

  /** 게시글 조회(목록) */
  boardList: function (_, { category_seq, offset }) {
    const limit = 10;

    return BoardManager.boardList({ category_seq }, offset, limit);
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

  /** 게시글 삭제 */
  removeBoard: function (_, { board_seq, user_seq }) {
    return this.findBoard(_, { board_seq, user_seq })
      .then((data) => {
        if (!data) {
          return new Result(
            Constants.ERROR_CODE._DENIAL_OF_SERVICES,
            Constants.ERROR_MESSAGE._DENIAL_OF_SERVICES
          );
        }

        return BoardManager.remove(_, { board_seq })
          .then((data) => {
            return data === 1
              ? new Result(
                  Constants.RESULT_CODE.SUCCESS,
                  Constants.RESULT_MESSAGE.SUCCESS
                )
              : new Result(
                  Constants.ERROR_CODE._DENIAL_OF_SERVICES,
                  Constants.ERROR_CODE._DENIAL_OF_SERVICES
                );
          })
          .catch((err) => {
            return new Result(
              Constants.ERROR_CODE._DENIAL_OF_SERVICES,
              Constants.ERROR_CODE._DENIAL_OF_SERVICES
            );
          });
      })
      .catch((err) => {
        return new Result(
          Constants.ERROR_CODE._DENIAL_OF_SERVICES,
          Constants.ERROR_MESSAGE._DENIAL_OF_SERVICES
        );
      });
  },
};

module.exports = BoardService;
