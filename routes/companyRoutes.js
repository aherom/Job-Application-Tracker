const express = require('express');
const { addJob, manageJobs, toggleJobStatus, viewRegisteredUsers } = require('../controllers/companyController');
const User = require('../models/User');
const Application = require('../models/Application'); 

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/addJob',authMiddleware,addJob);
router.get('/manageJobs', manageJobs);
router.put('/toggleJobStatus/:jobId', toggleJobStatus);
router.get('/viewRegisteredUsers/:jobId', async (req, res) => {
    const { jobId } = req.params;
    
    try {
      // Fetch applicants from Application table for the given jobId
      const applications = await Application.findAll({ where: { jobId } });
      const userIds = applications.map(app => app.userId);
  
      if (userIds.length === 0) {
        return res.status(404).json({ message: 'No applicants found' });
      }
  
      // Fetch user details
      const users = await User.findAll({
        where: { userId: userIds },
        attributes: { exclude: ['password'] } // Exclude password field
      });
  
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve applicants' });
    }
  });
  

module.exports = router;
