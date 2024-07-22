const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Company = require('./Company');

const Job = sequelize.define('Job', {
  jobId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  jobPosition: {
    type: DataTypes.STRING,
    allowNull: false
  },
  jobOpening: DataTypes.INTEGER,
  jobRegistrationStatus: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  jobDescription: DataTypes.STRING,
  totalReceivedApplication: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  companyId: {
    type: DataTypes.INTEGER,
  },
  companyName: DataTypes.STRING,
  companyIndustry: DataTypes.STRING,
  supportId: DataTypes.STRING
});

module.exports = Job;
