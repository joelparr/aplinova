/**
 * Description: Modulo de controllers de dentro do portal da aplinova
 * Author: Findi
 */

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
  res.render('./portal/aromas');
}

//Tela de corantes
exports.corantes = (req, res)=>{
  res.send("Voce esta na tela de corantes");
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
res.send("Voce esta na tela de proteinas");
}

exports.revConfeitaria = (req, res)=>{
  res.send("Voce esta na tela de confeitaria");
}

exports.subacucar= (req, res)=>{
  res.send("Voce esta na tela de subistituto do acucar");
}

exports.nossaempresa = (req, res)=>{
  res.render('./portal/nossaempresa')
}
