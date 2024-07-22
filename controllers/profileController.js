const path = require('path');
const User = require('../models/User');

const getUserProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve profile' });
  }
};

const updateUserProfile = async (req, res) => {
  const { highestEducation, userDescription, githubLink, address, phoneNumber } = req.body;
  const resumePath = req.files['resume'] ? req.files['resume'][0].path.replace(/\\/g, '/') : null;
  const coverPagePath = req.files['coverPage'] ? req.files['coverPage'][0].path.replace(/\\/g, '/') : null;

  try {
    await req.user.update({
      highestEducation,
      userDescription,
      githubLink,
      address,
      phoneNumber,
      resumePathLink: resumePath,
      coverPagePathLink: coverPagePath
    });
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

module.exports = { getUserProfile, updateUserProfile };
