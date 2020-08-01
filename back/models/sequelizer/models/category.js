module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define(
    "category",
    {
      category_seq: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      category_name: { type: DataTypes.STRING(255), allowNull: false },
      category_lvl: { type: DataTypes.INTEGER, allowNull: false },
      parent_category_seq: {
        type: DataTypes.INTEGER(11),
        references: {
          key: "category_seq",
        },
      },
      reg_id: { type: DataTypes.STRING(255), allowNull: false },
      reg_ip: { type: DataTypes.STRING(45), allowNull: false },
    },
    {
      freezeTableName: true,
    }
  );

  category.associate = function (models) {
    category.hasMany(models.category);
    category.belongsTo(models.category, { foreignKey: "parent_category_seq" });
    category.hasMany(models.board);
  };

  return category;
};
