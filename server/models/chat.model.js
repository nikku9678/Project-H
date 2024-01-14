const sequelize = require('../utils/databaseConnection')
const {DataTypes} = require('sequelize')

const ChatDB = sequelize.define('ChatDB', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   docterId: {
      type: DataTypes.INTEGER,
      allowNull: false
   },
   userId: {
      type: DataTypes.INTEGER,
      allowNull: false
   },
   message: {
      type: DataTypes.STRING,
      allowNull: false
   },
   timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
   }
}, {
   tableName: 'ChatDB',
   timestamps: false,
});


module.exports = ChatDB;

