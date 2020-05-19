/**
 * Description: Arquivo app principal da aplicacao
 * Author: Findi
 */

 //Declaracoes
 const express = require('express');
const app = express();
const dotEnv = require('dotenv');
dotEnv.config();
const morgan = require('morgan');
const usuario = require('./routes/usuario.js');
const aplinova = require('./routes/portal/aplinova.js');
const admin = require('./routes/admin/admin.js');
const path = require('path');
const {bdConnection} = require('./db/connection.js');
const models = require('./models');
const passport = require('passport');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const flash = require('connect-flash');
const {verbTreat} = require('./middlewares/httpverb')

//Variavel global na aplicacao do sequelize
global.sequelize = bdConnection();

//Passando para o modulo passport o proprio passport e o modulo de usuario
require('./config/passport/passport.js')(passport, models.User);

//Setando configuracoes da aplicacao
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
//Express validator para formularios
app.use(expressValidator());

//Configurando as sessoes para o passport e connect flash
app.use(session({
    secret: 'aplinova',
    resave: false,
    saveUninitialized: false
}));
//Connect flash
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/login', usuario);
app.use('/', aplinova);
app.use('/admin', verbTreat, admin); //verbtreat muda o req.method

app.listen(process.env.PORT || 3000);
