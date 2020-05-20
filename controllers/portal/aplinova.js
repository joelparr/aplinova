/**
 * Description: Modulo de controllers de dentro do portal da aplinova
 * Author: Findi
 */

 const produtos = [
     {title: 'Aromas', imageUrl: 'https://images.pexels.com/photos/134577/pexels-photo-134577.jpeg', href: 'aromas'},
     {title: 'Corantes', imageUrl: 'https://images.pexels.com/photos/461428/pexels-photo-461428.jpeg', href: 'corantes'},
     {title: 'Produtos Veganos e Orgânicos', imageUrl: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg', href: 'produtos-veganos'},
     {title: 'Proteínas', imageUrl: 'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg', href: 'proteinas'},
     {title: 'Substitutos de Açúcar e Fibras', imageUrl: 'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg', href: 'substitutos'},
     {title: 'Produtos Naturais', imageUrl: 'https://images.pexels.com/photos/134577/pexels-photo-134577.jpeg', href: 'produtos-naturais'},
 ]
const models = require('../../models');
const Categoria = models.Categoria;
const Produto = models.Produto;

//Tela principal do portal
exports.show = (req, res) => {
    res.render('./portal/index', {produtos});
}

//Tela de contato
exports.contato = (req, res)=>{
    res.render('./portal/contato');
}

//Tela de aromas
exports.aromas = (req, res)=>{
  Categoria.findAll({where:{titulo: "Aromas"}, include:{model:Produto, as:"produtos"}})
  .then(function(aromas){
    if(aromas.length){
      res.render('./portal/produtos/aromas', {aromas: aromas[0].dataValues.produtos});
    }else{
      res.render('./portal/produtos/corantes', {aromas: undefined});
    }
    
  })
  .catch(function(error){
    res.render('./portal/produtos/aromas', {error});
  })
  
}

//Tela de corantes
exports.corantes = (req, res)=>{
  Categoria.findAll({where:{titulo: "Corantes"}, include:{model:Produto, as: "produtos"}})
  .then(function(corantes){
    if(corantes.length){
      res.render('./portal/produtos/corantes', {corantes: corantes[0].dataValues.produtos});
    }else{
      res.render('./portal/produtos/corantes', {corantes: undefined});
    }
    
  })
  .catch(function(error){
    res.render('./portal/produtos/corantes', {error});
  })
  
}

exports.foodservice = (req, res)=>{
  res.render('./portal/produtos/foodservice', {produtos});
}

exports.ingredFuncionais = (req, res)=>{
  res.render('./portal/produtos/ingredientesfuncionais', {produtos});
}

exports.prodNaturais = (req, res)=>{
  res.render('./portal/produtos/produtosnaturais', {produtos});
}

exports.prodVeganos = (req, res)=>{
  res.render('./portal/produtos/produtosveganos', {produtos});
}

exports.proteinas = (req, res)=>{
  res.render('./portal/produtos/proteinas', {produtos});
}

exports.revConfeitaria = (req, res)=>{
  res.render('./portal/produtos/revconfeitaria', {produtos});
}

exports.subacucar= (req, res)=>{
  res.render('./portal/produtos/subacucarfibras', {produtos});
}

exports.nossaempresa = (req, res)=>{
  res.render('./portal/nossaempresa')
}
