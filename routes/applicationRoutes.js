const express = require('express');
const { applyJob, getUserApplications } = require('../controllers/applicationController');

const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/apply/:jobId',authMiddleware, applyJob);
router.get('/',authMiddleware, getUserApplications);

module.exports = router;
