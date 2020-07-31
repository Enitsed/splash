module.exports = (sequelize, DataTypes) => {
  const board = sequelize.define("board", {
    board_seq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_seq: { type: DataTypes.INTEGER, allowNull: false },
    board_title: { type: DataTypes.STRING(500) },
    board_content: { type: DataTypes.STRING(2000) },
    board_div_cd: { type: DataTypes.STRING(2) },
    reg_id: { type: DataTypes.STRING(255) },
    reg_ip: { type: DataTypes.STRING(45) },
    user_seq: { type: DataTypes.INTEGER },
  });

  board.associate = function (models) {
    board.belongsTo(models.category, { foreignKey: "category_seq" });
  };

  return board;
};
