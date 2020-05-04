/**
 * Description: Modulo de controle de troca de dados com o banco mysql
 * Author: Findi
 */
//Importando referencias
const models = require('../../models');
const Categoria = models.Categoria;
const {Op} = require('sequelize');

//Funcao de mostrar tela principal do admin
exports.show = (req, res)=>{
  res.render('./admin/index');
}

//Funcao de criar uma nova categoria
exports.createCategoria = (req, res)=>{
  //
}

//Funcao para capturar as categorias do banco
//Categoria (idCategoria) === 0  -> subcategoria
//Categoria === (?!==0) -> categoria principal (idCategoriaPai)
exports.getCategorias = async (req, res)=>{
  var categorias;
  var errors;
  await Categoria.findAll({where:{idCategoria: {[Op.ne]:0}}})
  .then(result=>{
    categorias = result;
  })
  .catch(error=>{
    errors = "Nao foi possivel recuperar as categorias"
  });

  //console.log(categorias[0].dataValues);
  res.json({data: categorias});
}
