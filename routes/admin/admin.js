/**
 * Description: Modulo de rotas de categorias
 * Authoe: Findi
 */

//Importando referencias
const express = require('express');
const router = express.Router();
const {isValid} = require('../../middlewares/isValidUser.js');
const {categoryDestroyVal} = require('../../middlewares/categoriaDestroyValidation');
const {
    index,
    createCategoria,
    getSubCategoria,
    getCategorias,
    newCategoria,
    getUser,
    logout,
    newProduto,
    createProduto,
    destroyProduto,
    showProduto,
    showSubCategoria,
    showCategoria,
    destroyCategoria,
    destroySubCategoria,
    updateSubCategoria,
    updateProduto,
    search,
    userconfig,
    comparePassword,
    updateUser,
    deleteUser} = require('../../controllers/admin/admin.js');

//rotas
//Raiz da chamada acontece no APP.JS
router.get('/', isValid, index);
//Get formulario
router.get('/new/produto', isValid, newProduto); //Formulario do novo produto
router.get('/new/categoria',isValid, newCategoria); //Formulario da categoria - TODO : Ira sair
router.get('/produto/:id', isValid, showProduto);
router.get('/subcategoria/:id', isValid, showSubCategoria);
router.get('/categoria/:id', isValid, showCategoria);
router.get('/search', search);
router.get('/userconfig',isValid, userconfig);
//Create
router.post('/produto', isValid, createProduto);
router.post('/categoria', isValid, createCategoria); //Serve para subcategoria tambem
//Destroy
router.delete('/categoria/:id', isValid, categoryDestroyVal, destroyCategoria);
router.delete('/produto/:id', isValid, destroyProduto);
router.delete('/subcategoria/:id', isValid, destroySubCategoria);
router.delete('/user/:id', isValid, deleteUser);
//Ajax
router.get('/categorias', isValid, getCategorias);
router.get('/subcategorias/:id', isValid, getSubCategoria);
router.get('/config/user/:id', isValid, getUser);
router.get('/logout', logout);
router.post('/compare/passwords', isValid, comparePassword);
//Update
router.patch('/subcategoria/:id', isValid, updateSubCategoria);
router.patch('/produto/:id', isValid, updateProduto);
router.patch('/config/user/:id', isValid, updateUser);

//Exportando router
module.exports = router;
