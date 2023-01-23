const Sequelize = require("../config/database");
const sequelize = require("sequelize");

const contacts = Sequelize.define(
  "contacts",
  {
    contacts: { type: sequelize.STRING, allowNull: false },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);
module.exports = contacts;
