const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Company = require('./Company');

const Application = sequelize.define('Application', {
  applicationId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  companyId: {
    type: DataTypes.INTEGER,
    references: {
      model: Company,
      key: 'companyId'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
   
  },
  jobId: {
    type: DataTypes.INTEGER
  },
  status: DataTypes.STRING
});

module.exports = Application;
