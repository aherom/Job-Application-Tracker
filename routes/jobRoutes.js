const express = require('express');
const { getAllJobs, getCompanyJobs } = require('../controllers/jobController');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/',authMiddleware, getAllJobs);
router.get('/company',authMiddleware, getCompanyJobs);

module.exports = router;
