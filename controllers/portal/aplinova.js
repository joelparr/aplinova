/**
 * Description: Modulo de controllers de dentro do portal da aplinova
 * Author: Findi
 */

//Declaracoes de variaveis
const models = require('../../models');
const Categoria = models.Categoria;
const Produto = models.Produto;
const {Op} = require('sequelize');
const mailerTransport = require('../../config/mail');

//Tela principal do portal
exports.show = (req, res) => {
    const produtos = [
      {title: req.params.t.home.flavors, imageUrl: './public/img/aromas.jpg', href: 'aromas'},
      {title: req.params.t.home.colors, imageUrl: './public/img/corantes.jpg', href: 'corantes'},
      {title: req.params.t.home.proteins, imageUrl: './public/img/proteinas.jpg', href: 'proteinas'},
      {title: req.params.t.produtos.titles.sugarSubstitutesAnd, imageUrl: './public/img/subs_acucar.jpg', href: 'subacucar'},
      {title: req.params.t.produtos.titles.naturalIngredients, imageUrl: './public/img/produtos_naturais.jpg', href: 'prodnaturais'},
      {title: req.params.t.home.veganAndOrganic, imageUrl: './public/img/prod_veganos.jpg', href: 'prodveganos'},
      {title: req.params.t.home.functionalIngredients, imageUrl: './public/img/ingredientes_funcionais.jpg', href: 'ingredientesfuncionais'},
      {title: req.params.t.home.confectioneryCoatings, imageUrl: './public/img/rev_confeitaria.jpg', href: 'revconfeitaria'},
      {title: req.params.t.home.foodService, imageUrl: './public/img/food_service.jpg', href: 'foodservice'}
    ]
    res.render('./portal/index', {produtos, t: req.params.t});
}

//Tela de contato
exports.contato = (req, res)=>{
    res.render('./portal/contato', {t: req.params.t});
}

//Tela de aromas
exports.aromas = (req, res)=>{
  Categoria.findOne({where:{titulo: "aromas"}, include:{model:Produto, as:"produtos"}})
  .then(function(aromas){
    res.render('./portal/produtos/aromas', {aromas: aromas.dataValues.produtos, t: req.params.t});
  })
  .catch(function(error){
    res.render('./portal/produtos/aromas', {aromas:undefined, error:error, t: req.params.t});
  })

}

//Tela de corantes
exports.corantes = (req, res)=>{
  Categoria.findOne({where:{titulo: "corantes"}, include:{model:Produto, as: "produtos"}})
  .then(function(corantes){
    res.render('./portal/produtos/corantes', {corantes: corantes.dataValues.produtos, t: req.params.t});
  })
  .catch(function(error){
    res.render('./portal/produtos/corantes', {corantes: undefined, error:error, t: req.params.t});
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
      res.render(url, {error: "Nao foi encontrada a categoria", foodservice: undefined, t: req.params.t});
    }
  })
  .then(function(subCat){
    if(subCat !== 0){
      res.render(url, {foodservice: subCat, error:undefined, t: req.params.t});
    }else{
      res.render(url, {error: "Nao foi encontrada a subcategoria", foodservice: undefined, t: req.params.t});
    }
  })
  .catch(function(error){
    res.render(url, {error: error, foodservice: undefined, t: req.params.t});
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
      res.render(url, {error: "Nao foi encontrada a categoria", ingredientes: undefined, t: req.params.t});
    }
  })
  .then(function(subCat){
    if(subCat !== 0){
      res.render(url, {ingredientes: subCat, error:undefined, t: req.params.t});
    }else{
      res.render(url, {error: "Nao foi encontrada a subcategoria", ingredientes: undefined, t: req.params.t});
    }
  })
  .catch(function(error){
    res.render(url, {error: error, ingredientes: undefined, t: req.params.t});
  })
}

//Tela de produtos naturais
exports.prodNaturais = (req, res)=>{
  Categoria.findOne({where:{titulo: "produtos naturais"}, include:{model:Produto, as:"produtos"}})
  .then(function(prodNatu){
    res.render('./portal/produtos/produtosnaturais', {produtos: prodNatu.dataValues.produtos, t: req.params.t});
  })
  .catch(function(error){
    res.render('./portal/produtos/produtosnaturais', {produtos: undefined, error:error, t: req.params.t});
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
      res.render(url, {error: "Nao foi encontrada a categoria", veganos: undefined, t: req.params.t});
    }
  })
  .then(function(subCat){
    if(subCat !== 0){
      res.render(url, {veganos: subCat, error:undefined, t: req.params.t});
    }else{
      res.render(url, {error: "Nao foi encontrada a subcategoria", veganos: undefined, t: req.params.t});
    }
  })
  .catch(function(error){
    res.render(url, {error: error, veganos: undefined, t: req.params.t});
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
      res.render(url, {error: "Nao foi encontrada a categoria", proteinas: undefined, t: req.params.t});
    }
  })
  .then(function(subCat){
    if(subCat !== 0){
      res.render(url, {proteinas: subCat, error:undefined, t: req.params.t});
    }else{
      res.render(url, {error: "Nao foi encontrada a subcategoria", proteinas: undefined, t: req.params.t});
    }
  })
  .catch(function(error){
    res.render(url, {error: error, proteinas: undefined, t: req.params.t});
  })
}

//Tela de revestimento de confeitaria
exports.revConfeitaria = (req, res)=>{
  Categoria.findOne({where:{titulo: "revestimentos para confeitaria"}, include:{model:Produto, as:"produtos"}})
  .then(function(revestimento){
    res.render('./portal/produtos/revconfeitaria', {revestimento: revestimento.dataValues.produtos, t: req.params.t});
  })
  .catch(function(error){
    res.render('./portal/produtos/revconfeitaria', {revestimento:undefined, error: error, t: req.params.t});
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
      res.render(url, {error: "Nao foi encontrada a categoria", subsAc: undefined, t: req.params.t});
    }
  })
  .then(function(subCat){
    if(subCat !== 0){
      res.render(url, {subsAc: subCat, error:undefined, t: req.params.t});
    }else{
      res.render(url, {error: "Nao foi encontrada a subcategoria", subsAc: undefined, t: req.params.t});
    }
  })
  .catch(function(error){
    res.render(url, {error: error, subsAc: undefined, t: req.params.t});
  })
}

//Tela do nossa empresa
exports.nossaempresa = (req, res)=>{
  res.render('./portal/nossaempresa', {t: req.params.t})
}

//Email de contato com o adm e o cliente
exports.contatoEmail = (req, res)=>{
  let assunto = `Contato cliente: ${req.body.nome}`;
  let contentAdm = `<html><body>Houve um contato do ${req.body.nome}. Email: ${req.body.email}. Telefone: ${req.body.telefone}. Empresa: ${req.body.empresa}. Mensagem: ${req.body.mensagem}</body></html>`;
  let contentCost = `<html><body>Seu contato com a aplinova foi realizado com sucesso. Porfavor aguarde retorno.</body></html>`
  sendContatoEmail("contato@aplinova.com.br", assunto, contentAdm) //administrador
  .then(sentAdm=>{
    return sendContatoEmail(req.body.email, assunto, contentCost) //cliente
  })
  .then(sentCli=>{
    console.log(sentCli);
    res.json({done:true});
  })
  .catch(err=>{
    console.log(err);
    res.json({done:false});
  })
}

//Funcao de envio de email
function sendContatoEmail(email, assunto, content){
  return new Promise((resolve, reject)=>{
    mailerTransport.sendMail({
      from: `Aplinova <contato@aplinova.com.br>`,
      to: email,
      subject: assunto,
      html: content
    }, (err, info)=>{
      if(err){
        console.log(err);
        reject("Ocorreu um problema ao enviar o email")
      }else{
        resolve(info);
      }
    })
  })
}

// Controle de Idioma
exports.lang = (req, res) => {
  req.session.t = req.params.ln;
  res.json({return: req.session.t});
}
