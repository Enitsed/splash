const Constants = require("./Constants");

module.exports = class Result {
  constructor(codeParam, msgParam) {
    this.statusCode = codeParam;

    if (this.statusCode == Constants.RESULT_CODE.SUCCESS) {
      this.status = Constants.RESULT_MESSAGE.SUCCESS;
      this.resultMsg = msgParam;
    } else {
      this.status = Constants.RESULT_MESSAGE.FAIL;
      this.errorMsg = msgParam;
    }
  }

  get _status() {
    return this.status || Constants.RESULT_MESSAGE.SUCCESS;
  }

  set _status(status) {
    this.status = status;
  }

  get _statusCode() {
    return this.statusCode || Constants.RESULT_CODE.SUCCESS;
  }

  set _statusCode(errCode) {
    this.statusCode = errCode;
  }

  get _resultMsg() {
    return this.resultMsg || Constants.RESULT_MESSAGE.SUCCESS;
  }

  set _resultMsg(msgParam) {
    this.resultMsg = msgParam;
  }

  get _errorMsg() {
    return this.errorMsg || Constants.RESULT_MESSAGE.FAIL;
  }

  set _errorMsg(errMsg) {
    this.errorMsg = errMsg;
  }
};
