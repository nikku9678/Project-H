// Room.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/databaseConnection');

const Room = sequelize.define('Room', {
   socketId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
   },
   roomId: {
      type: DataTypes.STRING,
      allowNull: false
   },
   docterId: {
      type: DataTypes.STRING,
      allowNull: true
   },
   userId: {
      type: DataTypes.STRING,
      allowNull: true
   }
}, {
   tableName: 'Rooms',
   timestamps: false
});

module.exports = Room;
