const   Company  = require('../models/Company');
const  User   = require('../models/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully', userId: user.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user.userId, email: user.email }, 'SECRET_KEY'); // Ensure 'SECRET_KEY' matches
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to login user' });
  }
};

const registerCompany = async (req, res) => {
  console.log(req.body);
  const { companyName,companyAddress,industry,numberOfEmployees,emailId,password,supportId} = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const company = await Company.create({ companyName,companyAddress, industry,numberOfEmployees,emailId,password: hashedPassword ,supportId});
    res.status(201).json({ message: 'Company registered successfully', companyId: company.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register company' });
  }
};

const loginCompany = async (req, res) => {
  const { emailId,password} = req.body;
  try {
    
    const company = await Company.findOne({ where: { emailId} });
   
    if (company && await bcrypt.compare(password, company.password)) {
      const token = jwt.sign({ companyId: company.companyId, email: company.emailId }, 'SECRET_KEY', { expiresIn: '1h' });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
   res.status(500).json({ error: 'Failed to login company' });
  }
};

module.exports = { registerUser, loginUser, registerCompany, loginCompany };
