const express = require('express');
const {show} = require('../controllers/aplinova.js');
const {isValid} = require('../middlewares/isValidUser.js');

const router = express.Router();

router.get('/', isValid, show);

module.exports = router;