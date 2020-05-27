/**
 * Description: Modulo de controllers de dentro do portal da aplinova
 * Author: Findi
 */

const subcategorias = [
{
    titulo: 'Para Panificação',
    produtos: [
        'Fermento Biológico Seco (Instant Dry Yeast)',
        'Melhoradores de Farinhas',
        'Gordura Vegetal em Pó Encapsulada',
        'Aromas',
        'Corantes',
        'Substitutos de Cacau',
        'Redutores de Sódio',
        'Conservantes Naturais',
        'Mel em Pó, Iogurte em Pó, Doce de Leite em Pó',
        'Queijos em Pó',
        'Extrato de Malte',
        'Emulsificantes'
    ]
},
  {
    titulo: 'Para Produtos Lácteos',
    produtos: [
        'Gordura Vegetal em Pó Encapsulada',
        'Aromas',
        'Corantes Naturais',
        'Conservantes Naturais',
        'Crispies de Malte'
    ]
  },
  {
    titulo: 'Para Frutas e Hortaliças',
    produtos: [
        'Antioxidante Natural para Extensão de Shelf-Life'
    ]
  }
]
//Declaracoes de variaveis
const models = require('../../models');
const Categoria = models.Categoria;
const Produto = models.Produto;
const {Op} = require('sequelize');

//Tela principal do portal
exports.show = (req, res) => {
    const produtos = [
      {title: 'Aromas', imageUrl: 'https://images.pexels.com/photos/134577/pexels-photo-134577.jpeg', href: 'aromas'},
      {title: 'Corantes', imageUrl: 'https://images.pexels.com/photos/461428/pexels-photo-461428.jpeg', href: 'corantes'},
      {title: 'Produtos Veganos e Orgânicos', imageUrl: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg', href: 'produtos-veganos'},
      {title: 'Proteínas', imageUrl: 'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg', href: 'proteinas'},
      {title: 'Substitutos de Açúcar e Fibras', imageUrl: 'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg', href: 'substitutos'},
      {title: 'Produtos Naturais', imageUrl: 'https://images.pexels.com/photos/134577/pexels-photo-134577.jpeg', href: 'produtos-naturais'},
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
  
  Categoria.findOne({where:{titulo: 'foodservice'}})
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