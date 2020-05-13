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
  res.render('./portal/produtos/aromas', {produtos});
}

//Tela de corantes
exports.corantes = (req, res)=>{
  res.render('./portal/produtos/corantes', {produtos});
}

exports.foodservice = (req, res)=>{
  res.send("Voce esta na tela de food service");
}

exports.ingredFuncionais = (req, res)=>{
  res.send("Voce esta na tela de ingredientes funcionais");
}

exports.prodNaturais = (req, res)=>{
  res.send("Voce esta na tela de produtos naturais");
}

exports.prodVeganos = (req, res)=>{
res.send("Voce esta na tela de produtos veganos");
}

exports.proteinas = (req, res)=>{
  res.render('./portal/produtos/proteinas', {produtos});
}

exports.revConfeitaria = (req, res)=>{
  res.send("Voce esta na tela de confeitaria");
}

exports.subacucar= (req, res)=>{
  res.render('./portal/produtos/subacucarfibras', {produtos});
}

exports.nossaempresa = (req, res)=>{
  res.render('./portal/nossaempresa')
}
