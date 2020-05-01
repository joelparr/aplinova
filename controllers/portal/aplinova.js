/**
 * Description: Modulo de controllers de dentro do portal da aplinova
 * Author: Findi
 */

//Tela principal do portal
exports.show = (req, res)=>{
    res.render('./portal/index');
}

//Tela de contato
exports.contato = (req, res)=>{
    res.render('./portal/contato');
}

//Tela de aromas
exports.aromas = (req, res)=>{
  res.send("Voce esta na tela de aromas");
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

}

exports.proteinas = (req, res)=>{

}

exports.revConfeitaria = (req, res)=>{

}

exports.subacucar= (req, res)=>{

}
