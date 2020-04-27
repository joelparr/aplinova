const express = require('express');
const app = express();
const dotEnv = require('dotenv');
dotEnv.config();
const morgan = require('morgan');
const usuario = require('./routes/usuario.js');
const aplinova = require('./routes/aplinova.js');
const path = require('path');
const {bdConnection} = require('./db/connection.js');

bdConnection();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

app.use(morgan('dev'));
app.use('/login', usuario);
app.use('/', aplinova);

app.listen(process.env.PORT || 3000);