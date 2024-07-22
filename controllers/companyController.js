const  Application = require('../models/Application');
const  Job = require('../models/Job');
const  User  = require('../models/User');
const Company = require('../models/Company');

const addJob = async (req, res) => {
  
  const { companyId } = req.company;
  const { jobPosition, jobOpening, jobDescription,supportId } = req.body;
  try {
    const companydetails = await Company.findOne({ where: {companyId} });
    const job = await Job.create({
      jobPosition: jobPosition,
      jobOpening: jobOpening,
      jobDescription: jobDescription,
      companyName : companydetails.companyName,
      companyIndustry : companydetails.industry,
      companyId : companyId,
      jobRegistrationStatus: true,
      totalReceivedApplications:0,
      supportId:supportId });
    res.status(200).json({ message: 'Job added successfully', jobId: job.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add job' });
  }
};

const manageJobs = async (req, res) => {
  const { companyId } = req.user;
  try {
    const jobs = await Job.findAll({ where: { companyId } });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve jobs' });
  }
};

const toggleJobStatus = async (req, res) => {
  const { jobId } = req.params;
  try {
    const job = await Job.findByPk(jobId);
    if (!job) return res.status(404).json({ error: 'Job not found' });

    job.jobRegistrationStatus = !job.jobRegistrationStatus;
    await job.save();
    res.status(200).json({ message: 'Job status updated successfully', job });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update job status' });
  }
};

const viewRegisteredUsers = async (req, res) => {
  const { jobId } = req.params;
  try {
    const applications = await Application.findAll({
      where: { jobId },
      include: [User]
    });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve registered users' });
  }
};

module.exports = { addJob, manageJobs, toggleJobStatus, viewRegisteredUsers };
