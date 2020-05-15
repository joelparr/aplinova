/**
 * Description: Módulo de conexão com banco de dados
 * Author: Daniel
 */

//importando .env
require('dotenv').config();
const configDb = require('../config/config.json');
var dbConnection = '';
const Sequelize = require('sequelize');

switch(process.env.NODE_ENV){
    case 'development':
        dbConnection = configDb.development;
        break;
    case 'production':
        dbConnection = configDb.production;
        break;
    default:
        dbConnection = configDb.production;
}

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
