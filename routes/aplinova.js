const express = require('express');
const {show, contato} = require('../controllers/aplinova.js');
//Não preciso estar logado para acessar a plataforma
//const {isValid} = require('../middlewares/isValidUser.js');

const router = express.Router();

router.get('/', show);
router.get('/contato', contato);

module.exports = router;