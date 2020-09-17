const nodemailer = require('nodemailer');
require('dotenv').config();

const config={
    host: process.env.MAILHOST,
    port: process.env.MAILPORT,
    secure: false,
    auth:{
        user: "contatoaplinova@gmail.com",
        pass: "aplinova7859"
    }
}

module.exports = nodemailer.createTransport(config);