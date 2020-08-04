module.exports = (sequelize, DataTypes) => {
  const board = sequelize.define(
    "board",
    {
      board_seq: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      category_seq: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: sequelize.models.category,
          key: "category_seq",
        },
      },
      board_title: { type: DataTypes.STRING(500) },
      board_content: { type: DataTypes.STRING(2000) },
      board_div_cd: { type: DataTypes.STRING(2) },
      reg_id: { type: DataTypes.STRING(255) },
      reg_ip: { type: DataTypes.STRING(45) },
      user_seq: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: sequelize.models.users,
          key: "user_seq",
        },
      },
    },
    { freezeTableName: true }
  );

  board.associate = function (models) {
    board.belongsTo(models.category, {
      foreignKey: "category_seq",
      as: "listOfBoard",
    });
    board.belongsTo(models.users, {
      foreignKey: "user_seq",
    });
  };

  return board;
};
