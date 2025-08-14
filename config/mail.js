const nodemailer = require('nodemailer');
require('dotenv').config();

// const config={
//     host: process.env.MAILHOST,
//     port: process.env.MAILPORT,
//     secure: false,
//     auth:{
//         user: process.env.MAILUSER,
//         pass: process.env.MAILPASS
//     }
// }

const transportConfig = {
    host: process.env.MAILHOST,
    port: Number(process.env.MAILPORT),
    secure: String(process.env.MAILPORT) === '465',
    auth: { user: process.env.MAILUSER, pass: process.env.MAILPASS }
};

const defaultOptions = {
  from: process.env.MAILFROM || 'Aplinova <no-reply@example.com>'
};

module.exports = nodemailer.createTransport(transportConfig, defaultOptions);