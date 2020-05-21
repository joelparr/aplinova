/**
 * Description: Modulo de controllers de dentro do portal da aplinova
 * Author: Findi
 */
const categorias = [
     {title: 'Aromas', imageUrl: 'https://images.pexels.com/photos/134577/pexels-photo-134577.jpeg', href: 'aromas'},
     {title: 'Corantes', imageUrl: 'https://images.pexels.com/photos/461428/pexels-photo-461428.jpeg', href: 'corantes'},
     {title: 'Produtos Veganos e Orgânicos', imageUrl: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg', href: 'produtos-veganos'},
     {title: 'Proteínas', imageUrl: 'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg', href: 'proteinas'},
     {title: 'Substitutos de Açúcar e Fibras', imageUrl: 'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg', href: 'substitutos'},
     {title: 'Produtos Naturais', imageUrl: 'https://images.pexels.com/photos/134577/pexels-photo-134577.jpeg', href: 'produtos-naturais'},
 ]
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
const models = require('../../models');
const Categoria = models.Categoria;
const Produto = models.Produto;

//Tela principal do portal
exports.show = (req, res) => {
    res.render('./portal/index', {produtos: categorias});
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
  res.render('./portal/produtos/foodservice', {subcategorias});
}

exports.ingredFuncionais = (req, res)=>{
  res.render('./portal/produtos/ingredientesfuncionais', {produtos: categorias});
}

exports.prodNaturais = (req, res)=>{
  Categoria.findAll({where:{titulo: "Produtos naturais"}, include:{model:Produto, as:"produtos"}})
  .then(function(prodNatu){
    if(prodNatu.length){
      res.render('./portal/produtos/produtosnaturais', {produtos: prodNatu[0].dataValues.produtos});
    }else{
      res.render('./portal/produtos/produtosnaturais', {produtos: undefined});
    }
  })
  .catch(function(error){
    res.render('./portal/produtos/produtosnaturais', {error});
  })

}

exports.prodVeganos = (req, res)=>{
  res.render('./portal/produtos/produtosveganos', {produtos: categorias});
}

exports.proteinas = (req, res)=>{
  res.render('./portal/produtos/proteinas', {produtos: categorias});
}

exports.revConfeitaria = (req, res)=>{
  Categoria.findAll({where:{titulo: "Revestimento para confeitaria"}, include:{model:Produto, as:"produtos"}})
  .then(function(revestimento){
    if(revestimento.length){
      res.render('./portal/produtos/revconfeitaria', {revestimento: revestimento[0].dataValues.produtos});
    }else{
      res.render('./portal/produtos/revconfeitaria', {revestimento: undefined});
    }
  })
  .catch(function(error){
    res.render('./portal/produtos/revconfeitaria', {error});
  })

}

exports.subacucar= (req, res)=>{
  res.render('./portal/produtos/subacucarfibras', {produtos: categorias});
}

exports.nossaempresa = (req, res)=>{
  res.render('./portal/nossaempresa')
}
