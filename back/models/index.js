"use strict";

if (process.env.STAGE === "development") {
  require("dotenv").config();
}
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const db = {};
const env = process.env.STAGE || "development";
const config = require(__dirname + "/../config/config.json")[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    process.env.DB_DATABASE || config.database,
    process.env.DB_USER || config.username,
    process.env.DB_PASSWORD || config.password,
    config
  );
}

fs.readdirSync(__dirname + "/sequelizer/models/")
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    // const model = sequelize["import"](
    //   path.join(__dirname + "/sequelizer/models/", file)
    // );
    const model = require(path.join(__dirname + "/sequelizer/models/", file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
