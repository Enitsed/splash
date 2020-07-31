module.exports = (sequelize, DataTypes) => {
  const login_history = sequelize.define("login_history", {
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

  login_history.associate = function (models) {
    login_history.belongsTo(models.users, { foreignKey: "user_seq" });
  };

  return login_history;
};
