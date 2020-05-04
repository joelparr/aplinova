/**
 * Description: Modulo de rotas de categorias
 * Authoe: Findi
 */

//Importando referencias
const express = require('express');
const router = express.Router();
const {isValid} = require('../../middlewares/isValidUser.js');
const {show, createCategoria, getCategorias} = require('../../controllers/admin/admin.js');

//rotas
//Raiz da chamada acontece no APP.JS
router.get('/', isValid, show);
router.post('/categoria', isValid, createCategoria);
router.get('/categorias', isValid, getCategorias);

//Exportando router
module.exports = router;
