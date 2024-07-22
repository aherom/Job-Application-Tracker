const  Job  = require('../models/Job');

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve jobs' });
  }
};

const getCompanyJobs = async (req, res) => {
  const { companyId } = req.company;
  try {
    const jobs = await Job.findAll({ where: { companyId } });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve jobs' });
  }
};

module.exports = { getAllJobs, getCompanyJobs };
