/**
 * Description: Modulo controller para o usuario
 * Author: Findi
 */

const fetch = require('node-fetch');
const models = require('../models');
const User = models.User;
const Forgotcode = models.Forgotcode;
const {Op} = require('sequelize');
const bcrypt = require('bcrypt-nodejs');

 //Tela de login
exports.login = (req, res)=>{
    res.render('./usuarios/login', {error: req.flash('error'), envio: req.flash('envio')});
}

//Tela de novo usuario
exports.newUser = (req, res)=>{
    res.render('./usuarios/signin', {error: req.flash('error'), envio: req.flash('envio')});
}

//Envia email para o administrador com o novo usuario a ser ativado
exports.sendemail = (req, res)=>{
    const assunto = "Solicitacao para aprovacao de login";
    const url = "https://api.emailjs.com/api/v1.0/email/send";

    if(req._passport.session){
        User.findByPk(req._passport.session.user)
        .then(function(user){
            const template = {
                user_id: "user_RtuuE0LQRe9QltUKAuJmS",
                service_id: "danielGmail",
                template_id:"template_1ofNnKLb",
                template_params: {
                    'assunto': assunto,
                    'destino': 'danieldts2013@gmail.com',
                    'corpo': `Usuario requisitanto solicitacao: ${user.firstName}. Email: ${user.email}`
                }
            }
            const options = {
                method: 'POST',
                headers: {"Content-type":"application/json"},
                body: JSON.stringify(template)
            }
            return fetch(url, options)
        })
        .then(function(result){
            if(result.ok){
                req.logout();
                req.flash('envio', 'Email foi enviado ao adm');
                res.redirect('/login/show');
            }
        })
        .catch(function(error){
            req.flash('error', 'Houve um erro no envio do email');
            res.redirect('/login/show');
        })
    }else{
        req.flash('error', 'Nao ha uma sessao valida');
        res.redirect('/login/show');
    }
}

exports.createForgot = (req, res)=>{
    const assunto = "Codigo para reset de senha";
    const url = "https://api.emailjs.com/api/v1.0/email/send";
    const forgotCode = Math.floor(Math.random() * (9000)) + 1000;
    var userInstance;
    User.findOne({where:{email:req.body.email}})
    .then(function(user){
        //Verificando se o usuario existe e se existe codigos ativos para reset
        if(user){
            userInstance = user;
            return Forgotcode.update({active:1}, {where:{userid:user.dataValues.id}})
        }else{
            req.flash('error', 'Esse email nao existe na base.');
            res.redirect('/login/forgot');
        }
    })
    .then(function(updated){
        //Criando o codigo para o usuario
        return userInstance.createForgotcode({codigo: String(forgotCode)})
    })
    .then(function(fgc){
        //Enviando email para usuario avisando
        const template = {
            user_id: "user_RtuuE0LQRe9QltUKAuJmS",
            service_id: "danielGmail",
            template_id:"template_1ofNnKLb",
            template_params: {
                'assunto': assunto,
                'destino': userInstance.dataValues.email,
                'corpo': `Usuario requisitanto solicitacao: ${userInstance.dataValues.firstName}. Codigo: ${String(forgotCode)}. Link: http://localhost:3000/login/forgot/reset`
            }
        }
        const options = {
            method: 'POST',
            headers: {"Content-type":"application/json"},
            body: JSON.stringify(template)
        }
        return fetch(url, options)
    })
    .then(function(result){
        req.logout();
        req.flash('envio', 'Email foi enviado com codigo.');
        res.redirect('/login/show');
    })
    .catch(function(error){
        //repassar o erro ao achar o usuario ou erro de criacao do codigo na tabela
        res.render('./usuarios/login', {error: error, envio:undefined});
    })
}

exports.forgot = (req, res)=>{
    res.render('./usuarios/forgot', {error: req.flash('error'), envio: req.flash('envio')});
}

//Carregando o formulario de reset
exports.forgotReset = (req, res)=>{
    res.render('./usuarios/reset', {error: req.flash('error'), envio: req.flash('envio')});
}

//Resetando a senha do usuario PATCH
exports.reset = (req, res)=>{
    var userInstance;
    User.findOne({where:{email: req.body.email}})
    .then(function(user){
        if(user){
            //Recuperando o usuario
            userInstance = user;
            //Achando o code dentro da tabela forgotcode
            return Forgotcode.findOne({where:{[Op.and]:[{active:0},{userId:user.dataValues.id}, {codigo:req.body.codigo}]}})
        }else{
            req.flash('error', 'Erro ao encontrar o usuario');
            res.redirect('/login/forgot/reset'); 
        }
        
    })
    .then(function(fgc){
        if(fgc){
            //Eu tenho o forgotcode e vou realizar o update
            return Forgotcode.update({active:1}, {where:{id:fgc.dataValues.id}});
        }else{
            req.flash('error', 'Erro ao encontrar o codigo.');
            res.redirect('/login/forgot/reset');
        }
        
    })
    .then(function(updatedFgc){
        //Realizar o hash do password
        const generateHashPassword = function(password){
            return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        }
        let newPassword = generateHashPassword(req.body.password);
        //Realizar o update do password do usuario
        return User.update({password: newPassword}, {where:{id:userInstance.dataValues.id}})
    })
    .then(function(updatedUser){
        //User updated
        req.flash('envio', 'Foi realizado o reset da senha.');
        res.redirect('/login/show');
    })
    .catch(function(error){
        console.log(error);
        req.flash('error', error);
        res.redirect('/login/forgot/reset');
    })
}


