const express = require('express');
const app = express();
const dotEnv = require('dotenv');
dotEnv.config();
const morgan = require('morgan');
const usuario = require('./routes/usuario.js');
const path = require('path');
const Sequelize = require('sequelize');
//Atributos Prod
const attributesdb = {
    username: 'b696fcdf64b8a7',
    password: '065dcdf8',
    host: 'us-cdbr-iron-east-01.cleardb.net',
    db: 'heroku_a3bd692f7d5af73'
}
//DB connection
const sequelize = new Sequelize(attributesdb.db, attributesdb.username, attributesdb.password,{
        host: attributesdb.host,
        dialect: 'mysql'
    });

//DEV
// const sequelize = new Sequelize('aplinova_dev', 'root', '123456',{
//         host: 'localhost',
//         dialect: 'mysql'
//     });

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

app.listen(process.env.PORT || 3000);