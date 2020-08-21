const config = {
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
};

module.exports = config;
