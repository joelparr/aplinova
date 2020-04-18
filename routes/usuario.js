/**
 * middleware das rotas
 */
const express = require('express');
const {login} = require('../controllers/usuario.js');

const routes = express.Router();

routes.get('/', login);

module.exports = routes;