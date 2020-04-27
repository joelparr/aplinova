/**
 * middleware das rotas
 */
const express = require('express');
const {login, newUser} = require('../controllers/usuario.js');
const passport = require('passport');

const routes = express.Router();

routes.get('/', login);
routes.post('/send', passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))
routes.get('/signin', newUser);
routes.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: 'login/signin',
    failureFlash: true
}));

module.exports = routes;