module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "users",
    {
      user_seq: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_name: { type: DataTypes.STRING(50), allowNull: false },
      user_id: { type: DataTypes.STRING, allowNull: false },
      user_password: { type: DataTypes.STRING, allowNull: false },
      gender: { type: DataTypes.STRING(2) },
      address: { type: DataTypes.STRING },
      phone_num: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      user_status: { type: DataTypes.STRING(10), allowNull: false },
    },
    {
      freezeTableName: true,
    }
  );

  user.associate = function (models) {
    user.hasMany(models.login_history);
  };

  return user;
};
