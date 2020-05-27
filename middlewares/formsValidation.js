/**
 * Description: Middleware para validacao de formulario e acessos
 * Author: Findi
 */

 //Importando modulos
const models = require('../models');
const User = models.User;
const Forgotcode = models.Forgotcode;
const {Op} = require('sequelize');

//Funcao que verifica se o usuario que esta logando possui um codigo ativo no banco
exports.forgotLoginValidation = (req, res, next)=>{
    User.findOne({where:{email: req.body.email}})
    .then(function(user){
        if(user){
            return Forgotcode.findOne({where:{[Op.and]:[{active:0}, {userId: user.dataValues.id}]}})
        }else{
            req.flash('error', 'Este email nao foi achado em nossa base.');
            return res.redirect('/login/show');
        }
    })
    .then(function(fgc){
        if(fgc){
            return res.redirect('/login/forgot/reset');
        }else{
            return next();
        }
    })
    .catch(function(error){
        req.flash('error', error);
        return res.redirect('/login');
    })
}

//Verifica no formulario de forgot se o email digitado realmente existe
exports.forgotValidation = (req, res, next)=>{
    User.findOne({where:{email: req.body.email}})
    .then(function(user){
        if(user){
            return next()
        }else{
            req.flash('error', 'Este email nao foi achado em nossa base.');
            return res.redirect('/login/forgot');
        }
    })
    .catch(function(error){
        req.flash('error', error);
        return res.redirect('/login/forgot');
    })
}

exports.forgotResetValidation = (req, res, next)=>{
    //Se o usuario existe
    User.findOne({where:{email: req.body.email}})
    .then(function(user){
        if(user){
            //Se o usuario existente possui codigo
            return Forgotcode.findOne({where:{[Op.and]:[{userId: user.dataValues.id}, {active:0}]}})
        }else{
            req.flash('error', 'Este email nao foi achado em nossa base.');
            return res.redirect('/login/forgot/reset');
        }
    })
    .then(function(fgc){
        if(fgc){
            return next();
        }else{
            req.flash('error', 'Este codigo nao esta valido para esse email');
            return res.redirect('/login/forgot/reset');
        }
    })
    .catch(function(error){
        req.flash('error', error);
        return res.redirect('/login/forgot/reset');
    })
}

exports.singupFormValidation = (req, res, next)=>{
    req.check('firstname', 'min 5 max 15 char para primeiro nome').isLength({min:5, max: 15});
    req.check('lastname', 'min 5 max 15 char para primeiro nome').isLength({min:5, max: 15});
    req.check('password', 'min 5 max 10 char para primeiro nome').isLength({min:5, max: 10});

    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map(error=>error.msg)[0];
        req.flash('error', firstError);
        return res.redirect('/login/signin');
    }
    next();
}

exports.resetFormValidation = (req, res, next)=>{
    req.check('email', 'Necessario ser um email.').isEmail();
    req.check('codigo', 'Minimo de 4 char').isLength({min:4});
    req.check('password', 'min 5 max 10 char para primeiro nome').isLength({min:5, max: 10});

    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map(error=>error.msg)[0];
        req.flash('error', firstError);
        return res.redirect('/login/forgot/reset');
    }
    next();
}

//Criar a validacao do formulario de reset
//Criar a validacao do formulario de signup