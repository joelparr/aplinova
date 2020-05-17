/**
 * Description: Modulo de rotas de categorias
 * Authoe: Findi
 */

//Importando referencias
const express = require('express');
const router = express.Router();
const {isValid} = require('../../middlewares/isValidUser.js');
const {
    index,
    createCategoria,
    getSubCategoria,
    getCategorias,
    newCategoria,
    logout,
    newProduto,
    createProduto,
    destroyProduto} = require('../../controllers/admin/admin.js');

//rotas
//Raiz da chamada acontece no APP.JS
router.get('/', isValid, index);
//Get formulario
router.get('/new/categoria',isValid, newCategoria); //Formulario da categoria - TODO : Ira sair
router.get('/new/produto', isValid, newProduto); //Formulario do novo produto
//Create
router.post('/produto', isValid, createProduto);
router.post('/categoria', isValid, createCategoria); //Serve para subcategoria tambem
//Destroy
router.delete('/item/:id', isValid, destroyProduto);
//Ajax
router.get('/categorias', isValid, getCategorias);
router.get('/subcategorias/:id', isValid, getSubCategoria);
router.get('/logout', logout);

//Exportando router
module.exports = router;
