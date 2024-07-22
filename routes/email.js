const Application = require('../models/Application');
const nodemailer = require('nodemailer');

const express = require('express')
const Router = express.Router();
Router.use('/updateStatus', async (req, res) => {
    const { userId, status, email } = req.body;
    console.log(`Updating status for user: ${email}`);
    try {
      await Application.update({ status }, { where: { userId } });

      
      const transporter = nodemailer.createTransport({
       service: 'gmail',
       auth: {
          user: 'mitlab104@gmail.com', 
          pass:  process.env.pass 
          }
          });

      const mailOptions = {
        from: 'mitlab104@gmail.com',
        to: email,
        subject: ' Action on your application ',
        text: 'This is a password reset request message.',
        html: `<h1>your job application is tranferd to ${status}</h1>`,
         };
      
        
         transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.log(error);
              res.status(500).send('Error sending email');
          } else {
              console.log('Email sent: ' + info.response);
              res.status(200).send('Email sent');
          }
      });


    } catch (error) {
      console.error('Error updating status:', error);
      res.status(500).json({ error: 'Error updating status' });
    }
  });

  module.exports = Router;