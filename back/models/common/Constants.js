const Constants = {
  USER_STATUS: {
    ACTIVE: "active",
    DORMANT: "dormant",
    INACTIVE: "inactive",
    DELETED: "deleted",
  },
  SIGNUP_RESULT: {
    SUCCESS: "success",
    FAIL: "fail",
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
    _NOT_AUTHORIZED: "500",
    _DENIAL_OF_SERVICES: "501",
    _NO_DATA_EXIST: "502",
  },
  ERROR_MESSAGE: {
    _NOT_AUTHORIZED: "인증 필요",
    _DENIAL_OF_SERVICES: "응답 거부",
    _NO_DATA_EXIST: "데이터 없음",
  },
};

module.exports = Constants;
