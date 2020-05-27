/**
 * Description: Modulo controller para o usuario
 * Author: Findi
 */

const fetch = require('node-fetch');
const models = require('../models');
const User = models.User;
const Forgotcode = models.Forgotcode;

 //Tela de login
exports.login = (req, res)=>{
    res.render('./usuarios/login', {error: req.flash('error'), envio: req.flash('envio')});
}

//Tela de novo usuario
exports.newUser = (req, res)=>{
    res.render('./usuarios/signin', {error: req.flash('error')});
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
    const forgotCode = Math.floor(Math.random() * (9000)) + 1000;
    var userInstance;
    User.findOne({where:{email:req.body.email}})
    .then(function(user){
        //create da tabela de forgotcodes
        if(user){
            userInstance = user;
            return Forgotcode.update({active:1}, {where:{id:user.dataValues.id}})
        }else{
            req.flash('error', 'Esse email nao existe na base.');
            res.redirect('/login/forgot');
        }
    })
    .then(function(updated){
        return userInstance.createForgotcode({codigo: String(forgotCode)})
    })
    .then(function(){
        //Enviar um email informando o codigo enviado
    })
    .then(function(result){
        req.logout();
        req.flash('envio', 'Email foi enviado com codigo.');
        res.redirect('/login/show');
    })
    .catch(function(error){
        //repassar o erro ao achar o usuario ou erro de criacao do codigo na tabela
        res.render('./usuarios/login', {error});
    })
}

exports.forgot = (req, res)=>{
    res.render('./usuarios/forgot', {error: req.flash('error'), envio: req.flash('envio')});
}


