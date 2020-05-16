/**
 * Description: Modulo de controle de troca de dados com o banco mysql
 * Author: Findi
 */
//Importando referencias
const models = require('../../models');
const Categoria = models.Categoria;
const Header = models.Header;
const User = models.User;
const Produto = models.Produto;
const ProdutoCategoria = models.ProdutoCategoria;
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

exports.newCategoria = (req, res)=>{
  //Formulario de criacao de categoria
  sendingData(req, res, './admin/newCategoria');
}

//Funcao de mostrar tela principal do admin
exports.index = (req, res)=>{
  //Lista de categorias, headers e produtos
  sendingData(req, res, './admin/index');
}

//Funcao de criar uma nova categoria
//Para criar uma nova categoira e necessario seguir os passos adiante
exports.createCategoria = async (req, res)=>{
  console.log(req);
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
      let nextCategoria;
      if(!categoriaIdMax){
        nextCategoria = 1;
      }else{
        nextCategoria = await parseInt(categoriaIdMax) + 1;
      }
      categoria.idCategoria = nextCategoria;
      categoria.idCategoriaPai = nextCategoria;
    })
    .catch(function(error){
      console.log(error);
    })
  }

  createheader({titulo: req.body.headerTitulo, descricao: req.body.headerDescricao})
  .then(function(newHeader){
    categoria.headerId = parseInt(newHeader.id);
    return createCategoriaHeader(categoria)
  })
  .then(function(newCategoria){
    res.json(newCategoria);
  })
  .catch(function(error){
    //criar um flash com o erro
    res.json(error);
  })
}

//Promisse para criar um header
function createheader(header){
  return new Promise((resolve, reject)=>{
    Header.create(header)
    .then(async function(newHeader){
      if(newHeader){
        resolve(newHeader);
      }else{
        reject("Nao criou o header");
      }

    })
    .catch(function(error){
      reject('Problemas em criar o header');
    })
  })
}

//Promisse para criar uma categoria com header
function createCategoriaHeader(categoria){
  return new Promise((resolve, reject)=>{
    Categoria.create(categoria)
    .then(function(newCategoria){
      if(newCategoria){
        resolve(newCategoria);
      }else{
        reject("Nao criou a categoria");
      }
    })
    .catch(function(error){
      reject("Problemas em criar a categoria");
    })
  })
}

exports.newProduto = (req, res)=>{
  res.render('./admin/newProduto.ejs');d
}

//Criacao de um novo produto
exports.createProduto = (req, res)=>{
  //1 - criar o produto com titulo e descricao
  const dataBody = {
    titulo: req.body.prodTitulo,
    descricao: req.body.prodDescricao
  }
  produtoNovo(dataBody)
  .then(function(novoProd){
    if(novoProd !== 0){
      let idCat;
      if(subCategoriaChecked = 'on'){
        //2 - criar o vinculo entre o produto e a categoria / subcategoria
        idCat = req.body.categoriaPai;
      }else{
        idCat = req.body.subCategoria;
      }
      return produtocategoria(novoProd.id, idCat);      
    }else{
      //dar uma resposta a tela
    }
  })
  .then(function(data){
    //dar uma resposta a tela com o resultado
  })
  .catch(function(error){
    //dar uma respota a tela
  })

  
}

//Promise que cria um novo produto
function produtoNovo(data){
  return new Promise((resolve, reject)=>{
    Produto.create(data)
    .then(function(novoProduto){
      novoProduto ? resolve(novoProduto) : reject(0);
    })
    .catch(function(error){
      reject(0);
    })
  })
}

//Promise que cria um vinculo entre o produto e a categoria
function produtocategoria(data){
  return new Promise((resolve, reject)=>{
    ProdutoCategoria.create(data)
    .then(function(produtoCat){
      produtoCat ? resolve(produtoCat) : reject(0);
    })
    .catch(function(error){
      reject(0);
    })
  })
}


//Funcao para capturar as categorias do banco
//Categoria (idCategoria) === 0  -> subcategoria
//Categoria === (?!==0) -> categoria principal (idCategoriaPai)
exports.getCategorias = (req, res)=>{
  var errors;
  Categoria.findAll({where:{idCategoria: {[Op.ne]:0}}})
  .then(result=>{
    res.json({data: result, error:undefined});
  })
  .catch(error=>{
    errors = "Nao foi possivel recuperar as categorias"
    res.json({data:undefined, error:error});
  });
}

exports.getSubCategoria = (req, res)=>{
  Categoria.findAll({where:{[Op.and]:[{idCategoriaPai: req.params.id},{idCategoria:0}]}})
  .then(function(subCategoria){
    res.json({data: subCategoria, error:undefined});
  })
  .catch(function(error){
    errors = "Nao foi possivel recuperar as subcategorias"
    res.json({data:undefined, error:error});
  })
}


exports.logout = (req, res)=>{
  req.logout();
  res.redirect('/login/show');
}
