const BoardService = require("../../services/boardService");
const Constants = require("../../models/common/Constants");
const Result = require("../../models/common/Result");

module.exports = class AuthRouter {
  constructor(app) {
    // write board mapping
    app.post("/insertBoard", async (req, res) => {
      // TODO : 로그인 한 유저 아니면 리다이렉트
      if (!req.session.user || !req.cookies.user) {
        return res.redirect("/");
      }

      BoardService.writeBoard();

      res.json(
        new Result(
          Constants.RESULT_CODE.SUCCESS,
          Constants.RESULT_MESSAGE.SUCCESS
        )
      );
    });
  }
};
