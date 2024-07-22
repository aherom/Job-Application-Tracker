const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Company = sequelize.define('Company', {
  companyId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  companyAddress: DataTypes.STRING,
  industry: DataTypes.STRING,
  numberOfEmployees: DataTypes.INTEGER,
  emailId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  supportId: DataTypes.STRING
});

module.exports = Company;
