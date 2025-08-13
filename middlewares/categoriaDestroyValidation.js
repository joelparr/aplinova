const models = require('../models');
const Categoria = models.Categoria;

exports.categoryDestroyVal = async (req, res, next)=>{
    let cat = await Categoria.findByPk(req.params.id);
    let subCategorias = await Categoria.findAll({where:{idCategoriaPai: cat.dataValues.idCategoria}});
    let prods = [];
    for await (let sub of subCategorias){
        let prod = await sub.getProdutos();
        if(prod.length){
            prods.push(prod);
        }
    }
    console.log(prods);
    if(prods.length){
        req.flash('error', 'Esta categoria nao pode ser deletada pois possui produtos');
        return res.redirect('/admin');
    }else{
        return next();
    }
}