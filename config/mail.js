const nodemailer = require('nodemailer');
require('dotenv').config();

const config={
    host: process.env.MAILHOST,
    port: process.env.MAILPORT,
    secure: false,
    auth:{
        user: process.env.MAILUSER,
        pass: process.env.MAILPASS
    }
}

module.exports = nodemailer.createTransport(config);