/**
 * middleware das rotas
 */
const express = require('express');
const {login, newUser, dashboard} = require('../controllers/usuario.js');
const passport = require('passport');

const routes = express.Router();

routes.get('/', login);
routes.post('/send', passport.authenticate('local-signin', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/admin',
    failureFlash: true
}))
routes.get('/signin', newUser);
routes.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/admin/dashboard',
    failureRedirect: 'admin/signin',
    failureFlash: true
}));
routes.get('/dashboard', dashboard);
module.exports = routes;