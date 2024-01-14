const { DataTypes } = require("sequelize")
const sequelize = require("../utils/databaseConnection")

const SessionDB = sequelize.define('SessionDB', {
   sessionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
   },
   doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
   },
   cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
   },
   time: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
   },
}, {
   freezeTableName: true,
});



module.exports = SessionDB;
