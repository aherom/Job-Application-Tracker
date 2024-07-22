const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Company = require('../models/Company');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from Bearer scheme

  if (token == null) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, 'SECRET_KEY', async (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden

    if (user.userId) {
      req.user = await User.findByPk(user.userId);
    } else if (user.companyId) {
      req.company = await Company.findByPk(user.companyId);
    }

    if (!req.user && !req.company) return res.sendStatus(403); // Forbidden

    next();
  });
};

module.exports = authMiddleware;
