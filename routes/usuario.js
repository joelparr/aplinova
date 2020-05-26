/**
 * middleware das rotas
 */
const express = require('express');
const {login, newUser, sendemail} = require('../controllers/usuario.js');
const passport = require('passport');

const routes = express.Router();

routes.get('/show', login);
routes.post('/send', passport.authenticate('local-signin', {
    successRedirect: '/admin',
    failureRedirect: '/login/show',
    failureFlash: true
}))
routes.get('/sendemail', sendemail);
routes.get('/signin', newUser);
routes.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/login/sendemail',
    failureRedirect: '/login/signin',
    failureFlash: true
}));
module.exports = routes;
