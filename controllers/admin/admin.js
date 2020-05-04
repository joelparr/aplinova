/**
 * Description: Modulo de controle de troca de dados com o banco mysql
 * Author: Findi
 */
//Importando referencias
const models = require('../../models');
const Categoria = models.Categoria;
const Header = models.Header;
const User = models.User;
const {Op} = require('sequelize');

//Funcao de envio de mensagens e status para todas as telas
function sendingData(req, res, urlView, argumentos){
    //Recuperando o usuario da session criada
    const userId = req._passport.session.user;
    //Verificando se existe argumentos
    if(!argumentos)argumentos={};
    //Verifica se existe erro e mensagens setadas
    if(argumentos){
      if(!argumentos.message) argumentos.message=undefined;
      if(!argumentos.eror) argumentos.error=undefined;
    }
    //Procurando o usuario do Id salvo na session
    User.findByPk(userId)
    .then(function(user){
      argumentos.usuario = user.dataValues;
      res.render(urlView, argumentos);
    })
    .catch(function(err){
      argumentos.usuario = undefined;
      //Poderiamos levar o erro a tela setando argumentos.error = err
      res.render(urlView, argumentos);
    })
}

exports.new = (req, res)=>{
  //Formulario de criacao de categoria
  sendingData(req, res, './admin/index');
}

//Funcao de mostrar tela principal do admin
exports.show = (req, res)=>{
  //Lista de categorias, headers e produtos
  sendingData(req, res, './admin/index');
}

//Funcao de criar uma nova categoria
//Para criar uma nova categoira e necessario seguir os passos adiante
exports.createCategoria = async (req, res)=>{
  var header;
  //1 -  criar o header e guardar seu ID
  await Header.create({titulo: req.body.headerTitulo, descricao: req.body.headerDescricao, imagemUrl: req.body.headerImage})
  .then(async function(newHeader){
    header = await newHeader;
  })

  var categoria = {};
  //2 - Verificar se e uma categoria ou subcategoria
  if(req.body.categoriaChecked !== 'on'){
    //4 - Caso seja subcategoria: colocar 0 no idCategoria e idCategoriaPai recebera o id do select categoria
    categoria.titulo = req.body.categoriaTitulo;
    categoria.descricao = req.body.categoriaDescricao;
    categoria.idCategoria = 0;
    categoria.idCategoriaPai = parseInt(req.body.categoriaPai);

  }else{
    categoria.titulo = req.body.categoriaTitulo;
    categoria.descricao = req.body.categoriaDescricao;
    //3 - Caso seja categoria: Verificar qual o ultimo registro da categoria e recuperar o idCategoria e somar + 1
    await Categoria.max('idCategoria')
    .then(async function(categoriaIdMax){
      console.log(categoriaIdMax);
      let nextCategoria = await parseInt(categoriaIdMax) + 1
      categoria.idCategoria = nextCategoria;
      categoria.idCategoriaPai = nextCategoria;
    })
  }
  if(header){
    //5 - Indexar o id do header na categoria
    categoria.headerId = parseInt(header.id);
    //6 - Criar categoria
    await Categoria.create(categoria)
    .then(function(newCategoria){
      res.redirect('/admin')
    })
  }
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
