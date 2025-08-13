const langPt = require('../locales/pt');
const langEn = require('../locales/en');
const langEs = require('../locales/es');

exports.selectedLanguage = (req, res, next) => {
    let t = langPt;
    if (req.session.t === 'en') {
        t = langEn;
    } else if (req.session.t === 'es') {
        t = langEs;
    }

    req.params.t = t;
    next();
}
