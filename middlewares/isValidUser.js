/**
 * Description: Middleware que verifica se o usuario esta logado
 * Author: Daniel
 */

 //Funcao que verifica se o usuario esta logado
exports.isValid = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login/show');
}
