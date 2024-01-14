const {DataTypes} = require("sequelize")
const sequelize = require("../utils/databaseConnection")

const UserDB = sequelize.define('UserDB', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  anonymousName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  wallet_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "default Image"
  }
},{
   freezeTableName: true, 
});

// UserDB.sync();
module.exports = UserDB;