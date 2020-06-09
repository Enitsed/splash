const constants = {
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
    _MAX_AGE: 10800,
  },
  JWT_TOKEN: {
    _EXPIRES_TIME: "30m",
    _ISSUER: "splash.com",
    _SUBJECT: "splash",
  },
};

module.exports = constants;
