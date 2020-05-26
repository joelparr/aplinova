/**
 * Description: Modulo controller para o usuario
 * Author: Findi
 */

 //Tela de login
exports.login = (req, res)=>{
    res.render('./usuarios/login', {error: req.flash('error')});
}

//Tela de novo usuario
exports.newUser = (req, res)=>{
    res.render('./usuarios/signin', {error: req.flash('error')});
}

exports.sendemail = (req, res)=>{

}
