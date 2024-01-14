const { DataTypes } = require("sequelize")
const sequelize = require("../utils/databaseConnection")

const NotificationDB = sequelize.define('NotificationDB', {
   notificationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
   },
   doctorId: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   userId: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   userName: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   roomId: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
         isEmail: true,
      },
   },
   userAge: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 18,
   },
   userWalletAmount: {
      type: DataTypes.FLOAT,
      allowNull: false
   },
   doctorChatFee: {
      type: DataTypes.FLOAT,
      allowNull: false
   },
   chatTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
   }
}, {
   tableName: 'NotificationDB',
   timestamps: true,
});

module.exports = NotificationDB;