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
    destroyProduto,
    showProduto,
    showSubCategoria,
    showCategoria,
    destroySubCategoria,
    updateSubCategoria,
    updateProduto} = require('../../controllers/admin/admin.js');

//rotas
//Raiz da chamada acontece no APP.JS
router.get('/', isValid, index);
//Get formulario
router.get('/new/categoria',isValid, newCategoria); //Formulario da categoria - TODO : Ira sair
router.get('/new/produto', isValid, newProduto); //Formulario do novo produto
router.get('/produto/:id', isValid, showProduto);
router.get('/subcategoria/:id', isValid, showSubCategoria);
router.get('/categoria/:id', isValid, showCategoria);
//Create
router.post('/produto', isValid, createProduto);
router.post('/categoria', isValid, createCategoria); //Serve para subcategoria tambem
//Destroy
router.delete('/produto/:id', isValid, destroyProduto);
router.delete('/subcategoria/:id', isValid, destroySubCategoria);
//Ajax
router.get('/categorias', isValid, getCategorias);
router.get('/subcategorias/:id', isValid, getSubCategoria);
router.get('/logout', logout);
//Update
router.patch('/subcategoria/:id', isValid, updateSubCategoria);
router.patch('/produto/:id', isValid, updateProduto);

//Exportando router
module.exports = router;
