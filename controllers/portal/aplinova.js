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
  getCat('foodservice')
  .then(function(fs){
    if(fs !== 0){
      return getSub(fs.dataValues.idCategoria)
    }else{
      res.render('./portal/produtos/foodservice', {error: "Nao foi encontrada a categoria", foodservice: undefined});
    }
  })
  .then(function(subFs){
    if(subFs !== 0){
      res.render('./portal/produtos/foodservice', {foodservice: subFs, error:undefined});
    }else{
      res.render('./portal/produtos/foodservice', {error: "Nao foi encontrada a subcategoria", foodservice: undefined});
    }
  })
  .catch(function(error){
    res.render('./portal/produtos/foodservice', {error: error, foodservice: undefined});
  })
}

//Tela de ingredientes funcionais
exports.ingredFuncionais = (req, res)=>{
  getCat('ingredientes funcionais')
  .then(function(inf){
    if(inf !== 0){
      return getSub(inf.dataValues.idCategoria)
    }else{
      res.render('./portal/produtos/ingredientesfuncionais', {error: "Nao foi encontrada a categoria", ingredientes: undefined});
    }
  })
  .then(function(subIf){
    if(subIf !== 0){
      res.render('./portal/produtos/ingredientesfuncionais', {ingredientes: subIf, error:undefined});
    }else{
      res.render('./portal/produtos/ingredientesfuncionais', {error: "Nao foi encontrada a subcategoria", ingredientes: undefined});
    }
  })
  .catch(function(error){
    res.render('./portal/produtos/ingredientesfuncionais', {error: error, ingredientes: undefined});
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
  getCat('produtos veganos e orgânicos')
  .then(function(veg){
    if(veg !== 0){
      return getSub(veg.dataValues.idCategoria)
    }else{
      res.render('./portal/produtos/produtosveganos', {error: "Nao foi encontrada a categoria", veganos: undefined});
    }
  })
  .then(function(subVeg){
    if(subVeg !== 0){
      res.render('./portal/produtos/produtosveganos', {veganos: subVeg, error:undefined});
    }else{
      res.render('./portal/produtos/produtosveganos', {error: "Nao foi encontrada a subcategoria", veganos: undefined});
    }
  })
  .catch(function(error){
    res.render('./portal/produtos/produtosveganos', {error: error, veganos: undefined});
  })
}

//Tela de proteinas
exports.proteinas = (req, res)=>{
  getCat('proteínas')
  .then(function(pro){
    if(pro !== 0){
      return getSub(pro.dataValues.idCategoria)
    }else{
      res.render('./portal/produtos/proteinas', {error: "Nao foi encontrada a categoria", proteinas: undefined});
    }
  })
  .then(function(subPro){
    if(subPro !== 0){
      res.render('./portal/produtos/proteinas', {proteinas: subPro, error:undefined});
    }else{
      res.render('./portal/produtos/proteinas', {error: "Nao foi encontrada a subcategoria", proteinas: undefined});
    }
  })
  .catch(function(error){
    res.render('./portal/produtos/proteinas', {error: error, proteinas: undefined});
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
  getCat('substituto de açúcar e fibras')
  .then(function(saf){
    if(saf !== 0){
      return getSub(saf.dataValues.idCategoria)
    }else{
      res.render('./portal/produtos/subacucarfibras', {error: "Nao foi encontrada a categoria", subsAc: undefined});
    }
  })
  .then(function(subSaf){
    if(subSaf !== 0){
      res.render('./portal/produtos/subacucarfibras', {subsAc: subSaf, error:undefined});
    }else{
      res.render('./portal/produtos/subacucarfibras', {error: "Nao foi encontrada a subcategoria", subsAc: undefined});
    }
  })
  .catch(function(error){
    res.render('./portal/produtos/subacucarfibras', {error: error, subsAc: undefined});
  })
}

//Tela do nossa empresa
exports.nossaempresa = (req, res)=>{
  res.render('./portal/nossaempresa')
}

//Promises get cat e sub
function getCat(categoria){
  return new Promise((resolve, reject)=>{
    Categoria.findOne({where:{titulo: categoria}})
    .then(function(foodservice){
      resolve(foodservice);
    })
    .catch(function(error){
      reject(0)
    })
  })
}

function getSub(idCategoriaPai){
  return new Promise((resolve, reject)=>{
    Categoria.findAll({where:{[Op.and]:[{idCategoria:0},{idCategoriaPai: idCategoriaPai}]}, include:{model:Produto, as:'produtos'}})
    .then(function(subFs){
      resolve(subFs);
    })
    .catch(function(error){
      reject(0);
    })
  })
}