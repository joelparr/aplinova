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
async function sendingData(req, res, urlView, argumentos){
    //Recuperando o usuario da session criada
    const userId = req._passport.session.user;
    //Verificando se existe argumentos
    if(!argumentos)argumentos={};
    //Verifica se existe erro e mensagens setadas
    if(argumentos){
      if(!argumentos.message) argumentos.message=undefined;
      if(!argumentos.error) argumentos.error=undefined;
    }

    let user = await User.findByPk(userId);
    let qtd;
    if(user){
      argumentos.usuario = user.dataValues;
      qtd = await User.count({where:{[Op.and]:[{active:0},{role:{[Op.notLike]:'bloqueado'}}]}});
      //[Op.like]:`%${req.query.prod}%`
      //{[Op.and]:[{idCategoriaPai: req.params.id},{idCategoria:0}]}
      argumentos.inativos = qtd
      res.render(urlView, argumentos);
    }else{
      argumentos.usuario = undefined;
      argumentos.inativos = undefined;
      res.render(urlView, argumentos);
    }
}

exports.newCategoria = async (req, res)=>{
  //Formulario de criacao de categoria
  await sendingData(req, res, './admin/newcategoria');
}

//Funcao de mostrar tela principal do admin
exports.index = async (req, res)=>{
  //Lista de categorias, subcategorias e produtos
  let categorias = await Categoria.findAll({include:{model:Produto, as: 'produtos'}});
  if(categorias){
    //Envia erros da validacao de delecao de categoria
    await sendingData(req, res, './admin/index', {categorias: categorias, error: req.flash('error')});
  }else{
    await sendingData(req, res, './admin/index', {message: "Nao foram encontradas nenhuma categoria"});
  }
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
    categoria.tituloEng = req.body.categoriaTituloEng;
    categoria.tituloEsp = req.body.categoriaTituloEsp;
    categoria.descricao = req.body.categoriaDescricao;
    categoria.descricaoEng = req.body.categoriaDescricaoEng;
    categoria.descricaoEsp = req.body.categoriaDescricaoEsp;
    categoria.idCategoria = 0;
    categoria.idCategoriaPai = parseInt(req.body.categoriaPai);

  }else{
    categoria.titulo = req.body.categoriaTitulo;
    categoria.tituloEng = req.body.categoriaTituloEng;
    categoria.tituloEsp = req.body.categoriaTituloEsp;
    categoria.descricao = req.body.categoriaDescricao;
    categoria.descricaoEng = req.body.categoriaDescricaoEng;
    categoria.descricaoEsp = req.body.categoriaDescricaoEsp;
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

  Categoria.create(categoria)
  .then(function(newCategoria){
    let data = {
      titulo: req.body.headerTitulo,
      tituloEng: req.body.headerTituloEng,
      tituloEsp: req.body.headerTituloEsp,
      descricao: req.body.headerDescricao,
      descricaoEng: req.body.headerDescricaoEng,
      descricaoEsp: req.body.headerDescricaoEsp
    }
    newCategoria.createHeader(data)
    return newCategoria;
  })
  .then(function(done){
    //Connect flash done
    req.body.categoriaChecked === "on" ? res.redirect('/admin') : res.json(done);
  })
  .catch(function(error){
    req.body.categoriaChecked === "on" ? res.redirect('/admin') : res.json(error);
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
    tituloEng: req.body.prodTituloEng,
    tituloEsp: req.body.prodTituloEsp,
    descricao: req.body.prodDescricao,
    descricaoEng: req.body.prodDescricaoEng,
    descricaoEsp: req.body.prodDescricaoEsp
  }

  var novoProduto;

  Produto.create(dataBody)
  .then(function(novoProd){
    novoProduto = novoProd;
    return Categoria.findOne({where:{idCategoria: parseInt(req.body.categoriaPai)}})
  })
  .then(function(categoria){
    if(req.body.subCategoriaChecked === 'on'){
      //2 - criar o vinculo entre o produto e a categoria / subcategoria
      return novoProduto.setCategorias(categoria);
    }else{
      return novoProduto.setCategorias([req.body.subCategoria]);
    }
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

//Somente deleta a categoria caso ela nao tenha produtos
exports.destroyCategoria = async (req, res)=>{
  //1 - Achar a categoria que foi escolhida
  //2 - Recuperar todas as subcategorias
  //3 - Deletar tanto categorias quanto subcategorias e produtos
  
  let categoria = await Categoria.findByPk(req.params.id); //1
  let categorias = await Categoria.findAll({where: {idCategoriaPai: categoria.dataValues.idCategoria}}); //2
  let arrayIdCats = categorias.map(hit=>hit.dataValues.id);
  await Categoria.destroy({where: {id: arrayIdCats}}); //3
  res.redirect('/admin');
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

//Ajax que retorna a categoria
exports.showCategoria = (req, res)=>{
  Categoria.findOne({where: {idCategoria: req.params.id}})
  .then(function(categoria){
    res.json({categoria});
  })
  .catch(function(error){
    res.json({error});
  })
}

exports.showCategoriaPrincipal=(req, res)=>{
  Categoria.findOne({where: {id: req.params.id}})
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
    tituloEng: req.body.tituloEng,
    tituloEsp: req.body.tituloEsp,
    descricao: req.body.descricao,
    descricaoEng: req.body.descricaoEng,
    descricaoEsp: req.body.descricaoEsp
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
    tituloEng: req.body.tituloEng,
    tituloEsp: req.body.tituloEsp,
    descricao: req.body.descricao,
    descricaoEng: req.body.descricaoEng,
    descricaoEsp: req.body.descricaoEsp
  }
  
  Produto.update(data, {where: {id: req.params.id}})
  .then(function(produto){
    res.json({update:"ok"});
  })
  .catch(function(error){
    res.json({error});
  })
}

exports.updateCategoria = (req, res)=>{
  const data = {
    titulo: req.body.titulo,
    tituloEng: req.body.tituloEng,
    tituloEsp: req.body.tituloEsp,
    descricao: req.body.descricao,
    descricaoEng: req.body.descricaoEng,
    descricaoEsp: req.body.descricaoEsp
  }
  Categoria.update(data, {where:{id: req.params.id}})
  .then(function(categoria){
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

  Produto.findAll({where:{titulo:{[Op.like]:`%${req.query.prod}%`}}, include:{model:Categoria, as:'categorias'}})
  .then(function(resultProd){
    if(resultProd.length){
      result.resultProd = resultProd;
    }
    return Categoria.findAll({where:{titulo:{[Op.like]:`%${req.query.prod}%`}}, include:{model:Produto, as:'produtos'}})
  })
  .then(function(resultCat){
    result.resultCat = resultCat;
    res.json({result});
  })
  .catch(function(error){
    res.json({error});
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

//Recuperando as configuracoes de usuario
exports.userconfig = async (req, res)=>{
  let users = await User.findAll();
  if(users){
    await sendingData(req, res, './admin/userconfig', {ativos: users.map(hit=>hit.dataValues)});
  }else{
    await sendingData(req, res, './admin/userconfig', {error: 'Houve um problema ao buscar os usuarios nao ativos', ativos: undefined});
  }
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

exports.updateUser = (req, res)=>{

  const generateHashPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  }

  var data = {}

  if(req.body.role){
    data = {
      admin: req.body.admin,
      active: req.body.active,
      role: req.body.role
    }
  }else if(req.body.admin && req.body.active){
    data = {
      admin: req.body.admin,
      active: req.body.active
    }
  }
  
  if(req.body.password){
    data = {};
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

exports.deleteUser = (req, res)=>{
  // User.update({active: false, role: 'bloqueado'},{where:{id: req.params.id}})
  User.destroy({where:{id: req.params.id}})
  .then(function(result){
    res.redirect('/admin/userconfig');
  })
  .catch(function(error){
    //Tratar com connect flash
    console.log(error);
  });
}

exports.getUser = (req, res)=>{
  User.findByPk(req.params.id)
  .then(function(user){
    res.json({user});
  })
  .catch(function(error){
    res.json({error});
  })
}
