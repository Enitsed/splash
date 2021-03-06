try {
  // include this only in development
  require("dotenv").config();
} catch (e) {
  console.log("This is required in development");
}

const SMTPConfig = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_AUTH_USER,
    pass: process.env.SMTP_AUTH_PASS,
  },
};

module.exports = SMTPConfig;
