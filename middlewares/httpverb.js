/**
 * Description: Middleware para tratamento de requisicoes put & delete
 * Author: Daniel
 */
//Funcao que tratam os verbos http delete e put (patch)
exports.verbTreat = (req, res, next)=>{
    //Delete
    if(req.method === 'GET' && req.query.method){
        req.method = req.query.method
    }
    //Patch
    if(req.method === 'POST' && req.body.method){
        req.method = req.body.method
    }
    next();
}