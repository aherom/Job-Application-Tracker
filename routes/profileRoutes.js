const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../models/User');
const Application = require('../models/Application');
const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, upload.fields([
  { name: 'resume', maxCount: 1 },
  { name: 'coverPage', maxCount: 1 }
]), updateUserProfile);

router.get('/download/:type/:id', async (req, res) => {
  const { type, id } = req.params; 


  let user;
  try {
    user = await User.findByPk(id); // Adjust according to your database access method
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching user' });
  }

  let filePath;
  if (type === 'resume') {
    filePath = user.resumePathLink;
  } else if (type === 'coverPage') {
    filePath = user.coverPagePathLink;
  } else {
    return res.status(400).json({ error: 'Invalid file type' });
  }

  if (!filePath || !fs.existsSync(path.join(__dirname, '..', filePath))) {
    return res.status(404).json({ error: 'File not found' });
  }

  res.download(path.join(__dirname, '..', filePath), err => {
    if (err) {
      res.status(500).json({ error: 'Failed to download file' });
    }
  });

  

  router.use('/updateStatus', async (req, res) => {
    const { userId, status, email } = req.body;
    console.log(`Updating status for user: ${email}`);
    try {
      await Application.update({ status }, { where: { userId } });
      res.status(200).json({ message: 'Status updated successfully' });
    } catch (error) {
      console.error('Error updating status:', error);
      res.status(500).json({ error: 'Error updating status' });
    }
  });


});module.exports = router;
