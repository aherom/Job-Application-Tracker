require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const companyRoutes = require('./routes/companyRoutes');
const jobRoutes = require('./routes/jobRoutes');
const profileRoutes = require('./routes/profileRoutes');
const email = require('./routes/email');

const app = express();


app.use(express.static(path.join(__dirname, 'script')));
app.use(express.static(path.join(__dirname, 'public')));
app.use( express.static(path.join(__dirname, 'uploads')));


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/user', profileRoutes);
app.use('/api/user',email);

app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


sequelize.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
