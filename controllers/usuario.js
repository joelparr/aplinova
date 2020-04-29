exports.login = (req, res)=>{
    res.render('./usuarios/login', {error: req.flash('error')});
}

exports.newUser = (req, res)=>{
    res.render('./usuarios/signin', {error: req.flash('error')});
}

exports.dashboard = (req, res)=>{
    res.send("Sistema de administracao");
}