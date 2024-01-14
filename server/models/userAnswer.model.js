const { DataTypes } = require("sequelize");
const sequelize = require("../utils/databaseConnection");

const UserAnswerDB = sequelize.define(
   "UserAnswerDB",
   {
      questionId: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
      },
      doctorId: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      userId: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      question: {
         type: DataTypes.TEXT,
         allowNull: false,
      },
      createdAt: {
         type: DataTypes.DATE,
         allowNull: false,
      },
      updatedAt: {
         type: DataTypes.DATE,
         allowNull: false,
      },
   },
   {
      freezeTableName: true,
   }
);

module.exports = UserAnswerDB;
