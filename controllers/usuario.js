/**
 * Description: Modulo controller para o usuario
 * Author: Findi
 */

const models = require('../models');
const User = models.User;
const Forgotcode = models.Forgotcode;
const {Op} = require('sequelize');
const bcrypt = require('bcrypt-nodejs');
const mailerTransport = require('../config/mail');

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

    if(req._passport.session){
        User.findByPk(req._passport.session.user)
        .then(function(user){
            //return sendContatoEmail('leonardo.takada.lt@apliquimica.com.br', assunto, `Usuario requisitanto solicitacao: ${user.firstName}. Email: ${user.email}`);
            return sendContatoEmail(process.env.MAILTO_CONTATO, assunto, `Usuario requisitanto solicitacao: ${user.firstName}. Email: ${user.email}`);
        })
        .then(function(result){
            req.logout();
            req.flash('envio', 'Email foi enviado ao adm');
            res.redirect('/login/show');
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

exports.createForgot = async (req, res)=>{

    const assunto = "Codigo para reset de senha";
    const forgotCode = Math.floor(Math.random() * (9000)) + 1000;

    let user = await User.findOne({where:{email:req.body.email}});
    let fgc;
    if(!user){
        req.flash('error', 'Esse email nao existe na base.');
        res.redirect('/login/forgot');
    }else{
        fgc = await Forgotcode.update({active:1}, {where:{userid:user.dataValues.id}});
        await user.createForgotcode({codigo: String(forgotCode)}); //Criando o forgotcode

        let content = `Usuario requisitanto solicitacao: ${user.dataValues.firstName}. Codigo: ${String(forgotCode)}. Link: https://www.aplinova.com.br/login/forgot/reset`;
        await sendContatoEmail(user.dataValues.email, assunto, content);
        req.logout();
        req.flash('envio', 'Email foi enviado com codigo.');
        res.redirect('/login/show');

    }
}

exports.forgot = (req, res)=>{
    res.render('./usuarios/forgot', {error: req.flash('error'), envio: req.flash('envio')});
}

//Carregando o formulario de reset
exports.forgotReset = (req, res)=>{
    res.render('./usuarios/reset', {error: req.flash('error'), envio: req.flash('envio')});
}

//Resetando a senha do usuario PATCH
exports.reset = async (req, res)=>{
    var userInstance;

    let user = await User.findOne({where:{email: req.body.email}});
    let fgc;
    if(!user){
        req.flash('error', 'Erro ao encontrar o usuario');
        res.redirect('/login/forgot/reset');
    }else{
        fgc = await Forgotcode.findOne({where:{[Op.and]:[{active:0},{userId:user.dataValues.id}, {codigo:req.body.codigo}]}});
        if(!fgc){
            req.flash('error', 'Erro ao encontrar o codigo.');
            res.redirect('/login/forgot/reset');
        }else{
            await Forgotcode.update({active:1}, {where:{id:fgc.dataValues.id}});

            //Realizar o hash do password
            const generateHashPassword = function(password){
                return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
            }
            let newPassword = generateHashPassword(req.body.password);
            //Realizar o update do password do usuario
            await User.update({password: newPassword}, {where:{id:user.dataValues.id}})
            req.flash('envio', 'Foi realizado o reset da senha.');
            res.redirect('/login/show');
        }
    }
}

//Funcao de envio de email
function sendContatoEmail(email, assunto, content){
    return new Promise((resolve, reject)=>{
      mailerTransport.sendMail({
        from: process.env.MAILFROM, //`Aplinova <contato@aplinova.com.br>`,
        to: email,
        subject: assunto,
        html: content
      }, (err, info)=>{
        if(err){
          console.log(err);
          reject("Ocorreu um problema ao enviar o email")
        }else{
          resolve(info);
        }
      })
    })
  }


