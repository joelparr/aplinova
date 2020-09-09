/**
 * Description: Modulo de roteamento
 * Author: Findi
 */
const express = require('express');
const {selectedLanguage} = require('../../middlewares/languageSelection');
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
  subacucar,
  nossaempresa,
  contatoEmail,
  lang
} = require('../../controllers/portal/aplinova.js');
//Não preciso estar logado para acessar a plataforma
//const {isValid} = require('../middlewares/isValidUser.js');

const router = express.Router();

router.get('/', selectedLanguage, show);
router.get('/contato', selectedLanguage, contato);
router.post('/sendContato', selectedLanguage, contatoEmail);
router.get('/aromas', selectedLanguage, aromas);
router.get('/corantes', selectedLanguage, corantes);
router.get('/foodservice', selectedLanguage, foodservice);
router.get('/ingredientesfuncionais', selectedLanguage, ingredFuncionais);
router.get('/prodnaturais', selectedLanguage, prodNaturais);
router.get('/prodveganos', selectedLanguage, prodVeganos);
router.get('/proteinas', selectedLanguage, proteinas);
router.get('/revconfeitaria', selectedLanguage, revConfeitaria); //revestimento confeitaria
router.get('/subacucar', selectedLanguage, subacucar);
router.get('/nossaempresa', selectedLanguage, nossaempresa);
router.get('/lang/:ln', lang);

module.exports = router;
