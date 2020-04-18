const express = require('express');
const app = express();
const dotEnv = require('dotenv');
dotEnv.config();
const morgan = require('morgan');
const usuario = require('./routes/usuario.js');
const path = require('path');
const Sequelize = require('sequelize');
//DB connection
const sequelize = new Sequelize('aplinova_dev', 'root', '123456'
,{
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
.then(function(){
    console.log('Banco conectado');
})
.catch(function(){
    console.log('Banco desconectado');
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

app.use(morgan('dev'));
app.use('/', usuario);

app.listen(process.env.APPPORT || 3000);