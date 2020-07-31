const { login_history } = require("../../");

const LoginHistoryManager = {
  create: function (param) {
    login_history.create(param);
  },
};

module.exports = LoginHistoryManager;
