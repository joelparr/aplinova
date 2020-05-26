/**
 * Description: Modulo de controle de troca de dados com o banco mysql
 * Author: Findi
 */

//Importando referencias aos modulos de banco de dados
const models = require('../../models');
const Categoria = models.Categoria;
const Header = models.Header;
const User = models.User;
const Produto = models.Produto;
const {Op} = require('sequelize');
const bcrypt = require('bcrypt-nodejs');

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
  sendingData(req, res, './admin/newcategoria');
}

//Funcao de mostrar tela principal do admin
exports.index = (req, res)=>{
  //Lista de categorias, subcategorias e produtos
  //Post.find({ where: { ...}, include: [User]})
  Categoria.findAll({include:{model:Produto, as: 'produtos'}})
  .then(function(categorias){
    if(categorias){
      sendingData(req, res, './admin/index', {categorias: categorias});
    }else{
      sendingData(req, res, './admin/index', {message: "Nao foram encontradas nenhuma categoria"});
    }
  })
  .catch(function(error){
    sendingData(req, res, './admin/index', {categorias: undefined, error: error});
  })
}

//Funcao de criar uma nova categoria
//Para criar uma nova categoira e necessario seguir os passos adiante
//Todas as funcoes referentes "createCategoria" se inciam com "cc"
exports.createCategoria = async (req, res)=>{
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
      //Tratar erro que ira retornar ao usuario
      console.log(error);
    })
  }

  //Chamando a Promise que ira inserir uma categoria
  ccCreateCategoria(categoria)
  .then(function(newCategoria){
     newCategoria.createHeader({titulo: req.body.headerTitulo, descricao: req.body.headerDescricao})
    return newCategoria;
  })
  .then(function(done){
    //Connect flash done
    req.body.categoriaChecked === "on" ? res.redirect('/admin') : res.json(done);
  })
  .catch(function(error){
    //Connect flash error
    req.body.categoriaChecked === "on" ? res.redirect('/admin') : res.json(error);
  })
}

// Promise criada para criar uma categoria
function ccCreateCategoria(categoria){
  return new Promise((resolve, reject)=>{
    Categoria.create(categoria)
    .then(function(newCategoria){
      if(newCategoria){
        resolve(newCategoria);
      }else{
        reject(0);
      }
    })
    .catch(function(error){
      reject(0);
    })
  })
}

//Funcao que retorna o formulario de novo produto 
exports.newProduto = (req, res)=>{
  sendingData(req, res, './admin/newProduto');
}

//Criacao de um novo produto - Todas as funcoes referente a criacao de produto possuem "cp" como
//primeiro caracter
exports.createProduto = (req, res)=>{
  //1 - criar o produto com titulo e descricao
  const dataBody = {
    titulo: req.body.prodTitulo,
    descricao: req.body.prodDescricao
  }

  var novoProduto;

  cpProdutoNovo(dataBody)
  .then(function(novoProd){
    novoProduto = novoProd;
    return cpRecuperarCategoria(parseInt(req.body.categoriaPai));
  })
  .then(function(categoria){
    if(req.body.subCategoriaChecked === 'on'){
      //2 - criar o vinculo entre o produto e a categoria / subcategoria
      return novoProduto.setCategorias(categoria);
    }else{
      return novoProduto.setCategorias([req.body.subCategoria]);
    }
    
    //return cpVinculoProdCat({produtoId: parseInt(novoProduto.id), categoriaId: parseInt(idCat)});  
  })
  .then(function(vinculoCatProd){
    // TODO: adicionar um connect flash
    res.redirect('/admin');
  })
  .catch(function(error){
    // TODO:  Verificar a necessidade de enviar um connect flash
    console.log(error);
  })
}

//Promise que cria um novo produto
function cpProdutoNovo(data){
  return new Promise((resolve, reject)=>{
    Produto.create(data)
    .then(function(novoProduto){
      novoProduto ? resolve(novoProduto) : reject(0);
    })
    .catch(function(error){
      reject(error);
    })
  })
}

//Promise que recupera o id da categoria pai
function cpRecuperarCategoria(catPai){
  return new Promise((resolve, reject)=>{
    Categoria.findOne({where:{idCategoria: catPai}})
    .then(function(categoria){
      categoria ? resolve(categoria) : reject(0);
    })
    .catch(function(error){
      reject(error);
    })
  })
}

//Funcao que realiza o destroy do produto
exports.destroyProduto = (req, res)=>{
  //Caso seja um produto
  Produto.destroy({where:{id:req.params.id}})
  .then(function(result){
    res.redirect('/admin');
  })
  .catch(function(error){
    //Tratar com connect flash
    console.log(error);
  });
}

//Funcao que realiza o destroy da categoria
exports.destroySubCategoria = (req, res)=>{
  //Caso seja uma subcategoria
  Categoria.destroy({where:{id: req.params.id}})
  .then(function(result){
    res.redirect('/admin');
  })
  .catch(function(error){
    //Tratar com connect flash
    console.log(error);
  });
}

//Ajax que retorna o produto para a tela
exports.showProduto = (req, res)=>{
  Produto.findOne({where:{id: req.params.id}, include:{model:Categoria, as: 'categorias'}})
  .then(function(produto){
    res.json({produto});
  })
  .catch(function(error){
    res.json({error});
  });
}

//Ajax que retorna o produto para a tela - ssc
exports.showSubCategoria = (req, res)=>{
  Categoria.findOne({where:{id: req.params.id}})
    .then(function(subCategoria){
      res.json({subCategoria});
    })
    .catch(function(error){
      res.json({error});
    });
}

//Ajax qure retorna a categoria
exports.showCategoria = (req, res)=>{
  Categoria.findOne({where: {idCategoria: req.params.id}})
  .then(function(categoria){
    res.json({categoria});
  })
  .catch(function(error){
    res.json({error});
  })
}

//Ajax para atualizar a subcategoria
exports.updateSubCategoria = (req, res)=>{
  const data = {
    titulo: req.body.titulo,
    descricao: req.body.descricao
  }

  Categoria.update(data, {where: {id: req.params.id}})
  .then(function(categoria){
    res.json({update:"ok"});
  })
  .catch(function(error){
    res.json({error});
  })
}

//Ajax para atualizar o produto
exports.updateProduto = (req, res)=>{
  const data = {
    titulo: req.body.titulo,
    descricao: req.body.descricao
  }
  Produto.update(data, {where: {id: req.params.id}})
  .then(function(produto){
    res.json({update:"ok"});
  })
  .catch(function(error){
    res.json({error});
  })
}

//AJAX Search da pagina principal
exports.search = (req, res)=>{
  var result = {
  }
  searchProdutos(req)
  .then(function(resultProd){
    if(resultProd.length){
      result.resultProd = resultProd;
    }
    return searchCategoria(req);
  })
  .then(function(resultCat){
    result.resultCat = resultCat;
    res.json({result});
  })
  .catch(function(error){
    res.json({error});
  })
}

//Promise para achar o produto
function searchProdutos(req){
  return new Promise((resolve, reject)=>{
    Produto.findAll({where:{titulo:{[Op.like]:`%${req.query.prod}%`}}, include:{model:Categoria, as:'categorias'}})
    .then(function(produtos){
      resolve(produtos);
    })
    .catch(function(error){
      reject(0);
    })
  });
}

//Promise para achar a categoria
function searchCategoria(req){
  return new Promise((resolve, reject)=>{
    Categoria.findAll({where:{titulo:{[Op.like]:`%${req.query.prod}%`}}, include:{model:Produto, as:'produtos'}})
    .then(function(categorias){
      resolve(categorias);
    })
    .catch(function(error){
      resolve(0);
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

exports.userconfig = (req, res)=>{
  User.findAll({where:{active:0}})
  .then(function(users){
    sendingData(req, res, './admin/userconfig', {ativos: users});
  })
  .catch(function(error){
    sendingData(req, res, './admin/userconfig', {error: 'Houve um problema ao buscar os usuarios nao ativos', ativos: undefined});
  })
  
}

//Logout da aplicacao
exports.logout = (req, res)=>{
  req.logout();
  res.redirect('/login/show');
}

//Ajax para comparar passwords entre o novo password e o atual do usuario
exports.comparePassword = (req, res)=>{
  var isValidPassword = function(userpass, password){
    return bcrypt.compareSync(password, userpass);
  }

  User.findByPk(req._passport.session.user)
  .then(function(user){
    if(!user){
      res.json({igual:false});
    }
    res.json({igual: isValidPassword(user.password, req.body.newpassword)});
  })
  .catch(function(error){
    //pensar o que vou fazer com esse retorno
    res.json({error});
  })
}

exports.updateUserPassword = (req, res)=>{

  const generateHashPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  }

  var data = {}
  if(req.body.password){
    data.password = generateHashPassword(req.body.password);
  }
  
  User.update(data, {where:{id:req.params.id}})
  .then(function(rowsUpdated){
    res.json({rowsUpdated});
  })
  .catch(function(error){
    res.json({error});
  })
}
