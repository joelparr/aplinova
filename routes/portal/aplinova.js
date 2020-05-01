/**
 * Description: Modulo de roteamento
 * Author: Findi
 */
const express = require('express');
const {
  show,
  contato,
  aromas,
  corantes,
  foodservice,
  ingredFuncionais,
  prodNaturais,
  prodVeganos,
  proteinas,
  revConfeitaria,
  subacucar} = require('../../controllers/portal/aplinova.js');
//Não preciso estar logado para acessar a plataforma
//const {isValid} = require('../middlewares/isValidUser.js');

const router = express.Router();

router.get('/', show);
router.get('/contato', contato);
router.get('/aromas', aromas);
router.get('/corantes', corantes);
router.get('/foodservice', foodservice);
router.get('/ingredientesfuncionais/', ingredFuncionais);
router.get('/prodnaturais', prodNaturais);
router.get('/prodveganos', prodVeganos);
router.get('/proteinas', proteinas);
router.get('/revconfeitaria', revConfeitaria); //revestimento confeitaria
router.get('/subacucar', subacucar);

module.exports = router;
