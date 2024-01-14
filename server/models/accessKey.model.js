const {DataTypes} = require("sequelize")
const sequelize = require("../utils/databaseConnection")


const AccessKey = sequelize.define('AccessKey',{
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
   key:{
      type: DataTypes.STRING,
      defaultValue: 'GrandMaster@2023DeadlyMaster@2023'
   }
},{
   freezeTableName: true, 
});

module.exports = AccessKey;