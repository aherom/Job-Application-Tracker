const Application = require('../models/Application');
const Job = require('../models/Job');
const Company = require('../models/Company');
const User = require('../models/User');

const applyJob = async (req, res) => {
  const { jobId } = req.params;
  const { userId } = req.user;

  try {
    const job = await Job.findByPk(jobId);
    console.log(job);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    
    const existingApplication = await Application.findOne({ where: { jobId, userId } });
    if (existingApplication) return res.status(400).json({ error: 'Already applied for this job' });

    const application = await Application.create({companyId:job.companyId,jobId: jobId,userId: userId, status: 'Applied' });
    job.totalReceivedApplications += 1;
    await job.save();
    res.status(201).json({ message: 'Application submitted successfully', applicationId: application.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to apply for job' });
  }
};

const getUserApplications = async (req, res) => {
  const { userId } = req.user;
  try {
    const applications = await Application.findAll({
      where: { userId }
    });

    const result = await Promise.all(applications.map(async (application) => {
      const job = await Job.findOne({
        where: { jobId: application.jobId },
        attributes: ['companyName', 'jobPosition']
      });

      return {
        ...application.dataValues,
        companyName: job ? job.companyName : null,
        jobPosition: job ? job.jobPosition : null
      };
    }));

    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve applications' });
  }
};


module.exports = { applyJob, getUserApplications };
