exports.httpToHttps = (req, res, next)=>{
    const local = req.url;
    const schema = (req.headers['x-forwarded-proto'] || "").toLowerCase();
    const www = req.headers.host
    const fullUrl = `https://${www}${local}`;
    
    const notLocalHost = ()=> www.indexOf('localhost') < 0;
    if(notLocalHost() && schema !== 'https'){
        res.redirect(fullUrl);
    }
    next();
}