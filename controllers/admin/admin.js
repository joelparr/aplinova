exports.show = (req, res)=>{
  res.render('./admin/index');
}

exports.newCategoria = (req, res)=>{
  res.send("Foi incluida uma nova categoria");
}

exports.getCategorias = (req, res)=>{
  res.send("Essas sao as categorias");
}
