const express = require('express');
const app = express();
const dotEnv = require('dotenv');
dotEnv.config();
const morgan = require('morgan');
const usuario = require('./routes/usuario.js');
const aplinova = require('./routes/aplinova.js');
const path = require('path');
const {bdConnection} = require('./db/connection.js');
const models = require('./models');
const passport = require('passport');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const flash = require('connect-flash');

bdConnection();

require('./config/passport/passport.js')(passport, models.User);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(expressValidator());
app.use(session({
    secret: 'aplinova',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/admin', usuario);
app.use('/', aplinova);

app.listen(process.env.PORT || 3000);