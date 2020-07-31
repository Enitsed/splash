module.exports = (sequelize, DataTypes) =>
  sequelize.define("login_history", {
    seq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    login_ip: { type: DataTypes.STRING(45), allowNull: false },
    login_status: { type: DataTypes.STRING(10), allowNull: false },
    user_num: { type: DataTypes.STRING, allowNull: false },
  });
