const express = require('express');
const { registerUser, loginUser, registerCompany, loginCompany } = require('../controllers/authController');
                                                

const router = express.Router();


router.post('/register/user', registerUser);
router.post('/login/user', loginUser);
router.post('/register/company', registerCompany);
router.use('/login/company', loginCompany);

module.exports = router;
