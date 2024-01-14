const { DataTypes } = require("sequelize")
const sequelize = require("../utils/databaseConnection")


const SessionUserDB = sequelize.define('SessionUserDB', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
   },
   doctorId:{
      type: DataTypes.INTEGER,
      allowNull: false
   },
   userId:{
      type: DataTypes.INTEGER,
      allowNull: false
   },
   age: {
      type: DataTypes.INTEGER,
      allowNull: false
   },
   consent: {
      type: DataTypes.BOOLEAN,
      allowNull: false
   },
   file: {
      type: DataTypes.STRING,
      allowNull: true
   },
   gender: {
      type: DataTypes.STRING,
      allowNull: false
   },
   medicalHistory: {
      type: DataTypes.STRING,
      allowNull: false
   },
   presentingIssue: {
      type: DataTypes.STRING,
      allowNull: false
   },
   treatmentGoal: {
      type: DataTypes.STRING,
      allowNull: false
   },
   phone: {
      type: DataTypes.STRING,
      allowNull: false
   }
}, {
   freezeTableName: true,
});

module.exports = SessionUserDB;