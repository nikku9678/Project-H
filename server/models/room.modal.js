const { DataTypes } = require('sequelize');
const sequelize = require('../utils/databaseConnection');
const DocterDB = require('./docter.model');

const RoomTable = sequelize.define('RoomTable', {
   roomId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
   },
},{
   tableName: 'RoomTable',
   timestamps: false
});

DocterDB.hasMany(RoomTable, { foreignKey: 'doctorId', sourceKey: 'id' });
RoomTable.belongsTo(DocterDB, { foreignKey: 'doctorId', targetKey: 'id' });


module.exports = RoomTable;