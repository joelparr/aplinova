/**
 * Description: Modulo de controllers de dentro do portal da aplinova
 * Author: Findi
 */

//Declaracoes de variaveis
const models = require('../../models');
const Categoria = models.Categoria;
const Produto = models.Produto;
const {Op} = require('sequelize');

//Tela principal do portal
exports.show = (req, res) => {
    const produtos = [
      {title: 'Aromas', imageUrl: './public/img/aromas.jpg', href: 'aromas'},
      {title: 'Corantes', imageUrl: './public/img/corantes.jpg', href: 'corantes'},
      {title: 'Produtos Veganos e Orgânicos', imageUrl: './public/img/prod_veganos.jpg', href: 'prodveganos'},
      {title: 'Proteínas', imageUrl: './public/img/proteinas.jpg', href: 'proteinas'},
      {title: 'Substitutos de <br>Açúcar e Fibras', imageUrl: './public/img/subs_acucar.jpg', href: 'subacucar'},
      {title: 'Produtos <br>Naturais', imageUrl: './public/img/produtos_naturais.jpg', href: 'prodnaturais'},
      {title: 'Revestimentos para Confeitaria', imageUrl: './public/img/rev_confeitaria.jpg', href: 'revconfeitaria'},
      {title: 'Food Service', imageUrl: './public/img/food_service.jpg', href: 'foodservice'},
      {title: 'Ingredientes Funcionais', imageUrl: './public/img/ingredientes_funcionais.jpg', href: 'ingredientesfuncionais'}
    ]
    res.render('./portal/index', {produtos});
}

//Tela de contato
exports.contato = (req, res)=>{
    res.render('./portal/contato');
}

//Tela de aromas
exports.aromas = (req, res)=>{
  Categoria.findOne({where:{titulo: "aromas"}, include:{model:Produto, as:"produtos"}})
  .then(function(aromas){
    res.render('./portal/produtos/aromas', {aromas: aromas.dataValues.produtos});
  })
  .catch(function(error){
    res.render('./portal/produtos/aromas', {aromas:undefined, error:error});
  })

}

//Tela de corantes
exports.corantes = (req, res)=>{
  Categoria.findOne({where:{titulo: "corantes"}, include:{model:Produto, as: "produtos"}})
  .then(function(corantes){
    res.render('./portal/produtos/corantes', {corantes: corantes.dataValues.produtos});
  })
  .catch(function(error){
    res.render('./portal/produtos/corantes', {corantes: undefined, error:error});
  })

}

//Tela de foodservice
exports.foodservice = (req, res)=>{
  const url = './portal/produtos/foodservice';

  Categoria.findOne({where:{titulo: 'food service'}})
  .then(function(cat){
    if(cat !== 0){
      return Categoria.findAll({where:{[Op.and]:[{idCategoria:0},{idCategoriaPai: cat.dataValues.idCategoria}]}, include:{model:Produto, as:'produtos'}})
    }else{
      res.render(url, {error: "Nao foi encontrada a categoria", foodservice: undefined});
    }
  })
  .then(function(subCat){
    if(subCat !== 0){
      res.render(url, {foodservice: subCat, error:undefined});
    }else{
      res.render(url, {error: "Nao foi encontrada a subcategoria", foodservice: undefined});
    }
  })
  .catch(function(error){
    res.render(url, {error: error, foodservice: undefined});
  })
}

//Tela de ingredientes funcionais
exports.ingredFuncionais = (req, res)=>{
  const url = './portal/produtos/ingredientesfuncionais';

  Categoria.findOne({where:{titulo: 'ingredientes funcionais'}})
  .then(function(cat){
    if(cat !== 0){
      return Categoria.findAll({where:{[Op.and]:[{idCategoria:0},{idCategoriaPai: cat.dataValues.idCategoria}]}, include:{model:Produto, as:'produtos'}})
    }else{
      res.render(url, {error: "Nao foi encontrada a categoria", ingredientes: undefined});
    }
  })
  .then(function(subCat){
    if(subCat !== 0){
      res.render(url, {ingredientes: subCat, error:undefined});
    }else{
      res.render(url, {error: "Nao foi encontrada a subcategoria", ingredientes: undefined});
    }
  })
  .catch(function(error){
    res.render(url, {error: error, ingredientes: undefined});
  })
}

//Tela de produtos naturais
exports.prodNaturais = (req, res)=>{
  Categoria.findOne({where:{titulo: "produtos naturais"}, include:{model:Produto, as:"produtos"}})
  .then(function(prodNatu){
    res.render('./portal/produtos/produtosnaturais', {produtos: prodNatu.dataValues.produtos});
  })
  .catch(function(error){
    res.render('./portal/produtos/produtosnaturais', {produtos: undefined, error:error});
  })

}

//Tela de produtos veganos
exports.prodVeganos = (req, res)=>{
  const url = './portal/produtos/produtosveganos';
  Categoria.findOne({where:{titulo: 'produtos veganos e orgânicos'}})
  .then(function(cat){
    if(cat !== 0){
      return Categoria.findAll({where:{[Op.and]:[{idCategoria:0},{idCategoriaPai: cat.dataValues.idCategoria}]}, include:{model:Produto, as:'produtos'}})
    }else{
      res.render(url, {error: "Nao foi encontrada a categoria", veganos: undefined});
    }
  })
  .then(function(subCat){
    if(subCat !== 0){
      res.render(url, {veganos: subCat, error:undefined});
    }else{
      res.render(url, {error: "Nao foi encontrada a subcategoria", veganos: undefined});
    }
  })
  .catch(function(error){
    res.render(url, {error: error, veganos: undefined});
  })
}

//Tela de proteinas
exports.proteinas = (req, res)=>{
  const url = './portal/produtos/proteinas';

  Categoria.findOne({where:{titulo: 'proteínas'}})
  .then(function(cat){
    if(cat !== 0){
      return Categoria.findAll({where:{[Op.and]:[{idCategoria:0},{idCategoriaPai: cat.dataValues.idCategoria}]}, include:{model:Produto, as:'produtos'}})
    }else{
      res.render(url, {error: "Nao foi encontrada a categoria", proteinas: undefined});
    }
  })
  .then(function(subCat){
    if(subCat !== 0){
      res.render(url, {proteinas: subCat, error:undefined});
    }else{
      res.render(url, {error: "Nao foi encontrada a subcategoria", proteinas: undefined});
    }
  })
  .catch(function(error){
    res.render(url, {error: error, proteinas: undefined});
  })
}

//Tela de revestimento de confeitaria
exports.revConfeitaria = (req, res)=>{
  Categoria.findOne({where:{titulo: "revestimentos para confeitaria"}, include:{model:Produto, as:"produtos"}})
  .then(function(revestimento){
    res.render('./portal/produtos/revconfeitaria', {revestimento: revestimento.dataValues.produtos});
  })
  .catch(function(error){
    res.render('./portal/produtos/revconfeitaria', {revestimento:undefined, error: error});
  })

}

//Telas de substituto do acucar
exports.subacucar= (req, res)=>{

  const url = './portal/produtos/subacucarfibras';

  Categoria.findOne({where:{titulo: 'substituto de açúcar e fibras'}})
  .then(function(cat){
    if(cat !== 0){
      return Categoria.findAll({where:{[Op.and]:[{idCategoria:0},{idCategoriaPai: cat.dataValues.idCategoria}]}, include:{model:Produto, as:'produtos'}})
    }else{
      res.render(url, {error: "Nao foi encontrada a categoria", subsAc: undefined});
    }
  })
  .then(function(subCat){
    if(subCat !== 0){
      res.render(url, {subsAc: subCat, error:undefined});
    }else{
      res.render(url, {error: "Nao foi encontrada a subcategoria", subsAc: undefined});
    }
  })
  .catch(function(error){
    res.render(url, {error: error, subsAc: undefined});
  })
}

//Tela do nossa empresa
exports.nossaempresa = (req, res)=>{
  res.render('./portal/nossaempresa')
}
