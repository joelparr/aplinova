const nodemailer = require('nodemailer');
require('dotenv').config();

const config={
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth:{
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
}

module.exports = nodemailer.createTransport(config);