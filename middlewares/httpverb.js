/**
 * Description: Middleware para tratamento de requisicoes put & delete
 * Author: Daniel
 */
//Funcao que tratam os verbos http delete e put (patch)
exports.verbTreat = (req, res, next)=>{
    if(req.method === 'GET' && req.query.method){
        req.method = req.query.method
    }
    next();
}