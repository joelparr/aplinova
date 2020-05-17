/**
 * Description: Middleware para tratamento de requisicoes put & delete
 * Author: Daniel
 */

exports.verbTreat = (req, res, next)=>{
    if(req.method === 'GET' && req.query.method){
        req.method = req.query.method
    }
    console.log(req.method);
    next();
}