const Constants = {
  USER_STATUS: {
    ACTIVE: "active",
    DORMANT: "dormant",
    INACTIVE: "inactive",
    DELETED: "deleted",
  },
  LOGIN_RESULT: {
    SUCCESS: "success",
    FAIL: "fail",
  },
  COOKIE_OPTION: {
    maxAge: 1000 * 60 * 30, // 30 분
    // httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 30), // 30 분
  },
  JWT_TOKEN_OPTION: {
    expiresIn: "30m",
    issuer: "localhost",
    subject: "splash",
  },
  ERROR_CODE: {
    _NECESSARY_INPUT_NEEDED: "402",
    _NO_DATA_EXIST: "404",
    _ALREADY_USED: "405",
    _NOT_AUTHORIZED: "500",
    _DENIAL_OF_SERVICES: "501",
    _NO_VALID_USER_EXIST: "503",
  },
  ERROR_MESSAGE: {
    _NECESSARY_INPUT_NEEDED: "필수 입력값이 비어있습니다.",
    _NO_DATA_EXIST: "해당 데이터가 존재하지 않습니다.",
    _ALREADY_USED: "이미 사용 중입니다.",
    _NOT_AUTHORIZED: "로그인 혹은 접근 권한이 필요합니다.",
    _DENIAL_OF_SERVICES:
      "서버에서 응답을 거부 하였습니다. 잠시 후 재 시도하여 주세요.",
    _NO_VALID_USER_EXIST: "유효하지 않는 계정 정보 입니다.",
  },
};

module.exports = Constants;
