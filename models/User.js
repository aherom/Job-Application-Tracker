const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  highestEducation: DataTypes.STRING,
  userDescription: DataTypes.STRING,
  githubLink: DataTypes.STRING,
  address: DataTypes.STRING,
  phoneNumber: DataTypes.STRING,
  resumePathLink: DataTypes.STRING,
  coverPagePathLink: DataTypes.STRING
});

module.exports = User;
