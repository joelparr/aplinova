/**
 * middleware das rotas
 */
const express = require('express');
const {login, newUser, sendemail, forgot, createForgot, forgotReset, reset} = require('../controllers/usuario.js');
const passport = require('passport');
const {forgotLoginValidation, forgotValidation, forgotResetValidation, resetFormValidation, singupFormValidation} = require('../middlewares/formsValidation');

const routes = express.Router();

routes.get('/show', login);
routes.post('/send', forgotLoginValidation, passport.authenticate('local-signin', {
    successRedirect: '/admin',
    failureRedirect: '/login/show',
    failureFlash: true
}))
routes.get('/sendemail', sendemail);
routes.get('/signin', newUser);
routes.post('/signup', singupFormValidation, passport.authenticate('local-signup', {
    successRedirect: '/login/sendemail',
    failureRedirect: '/login/signin',
    failureFlash: true
}));
routes.get('/forgot', forgot);
routes.post('/forgot', forgotValidation, createForgot);
routes.get('/forgot/reset', forgotReset);
routes.patch('/forgot/reset', resetFormValidation, forgotResetValidation, reset);

module.exports = routes;
