const { DataTypes } = require("sequelize")
const sequelize = require("../utils/databaseConnection")

const DocterDB = sequelize.define('DocterDB', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  about: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
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
  feePerMin: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  feePerMinSession: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 3.5,
  },
  timings: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '10AM-7PM Week Days'
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  freezeTableName: true,
});


module.exports = DocterDB;