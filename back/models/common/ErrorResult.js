const Constants = require("./Constants");

module.exports = class ErrorResult {
  constructor(codeParam, msgParam) {
    this.errorCode = codeParam;
    this.errorMsg = msgParam;
  }

  get _errorCode() {
    return this.errorCode || Constants.ERROR_CODE._NOT_AUTHORIZED;
  }

  set _errorCode(errCode) {
    this.errorCode = errCode;
  }

  get _errorMsg() {
    return this.errorMsg || Constants.ERROR_MESSAGE._NOT_AUTHORIZED;
  }

  set _errorMsg(errMsg) {
    this.errorMsg = errMsg;
  }
};
