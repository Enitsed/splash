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
  COOKIE: {
    _MAX_AGE: 1800,
  },
  JWT_TOKEN: {
    _EXPIRES_TIME: "30m",
    _ISSUER: "splash.com",
    _SUBJECT: "splash",
  },
  ERROR_CODE: {
    _NOT_AUTHORIZED: "500",
    _DENIAL_OF_SERVICES: "501",
  },
  ERROR_MESSAGE: {
    _NOT_AUTHORIZED: "인증 필요",
    _DENIAL_OF_SERVICES: "응답 거부",
  },
};

module.exports = Constants;
