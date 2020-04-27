/**
 * Description: Módulo de conexão com banco de dados
 * Author: Daniel
 */

//importando .env
require('dotenv').config();
const configDb = require('../config/config.json');
var dbConnection = '';
const Sequelize = require('sequelize');
process.env.ENVIROMENT==='DEV' ? dbConnection = configDb.development : dbConnection = configDb.production

exports.bdConnection=(req, res, next)=>{
    const sequelize = new Sequelize(dbConnection.database, dbConnection.username, dbConnection.password, {
        host: dbConnection.host,
        dialect: dbConnection.dialect
    });

    sequelize.authenticate()
    .then(function(auth){
        console.log("Esta conectado");
    })
    .catch(function(error){
        console.log('Erro na conexao: ' + error);
    });

    return sequelize;
}
