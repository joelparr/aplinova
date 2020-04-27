const express = require('express');
const {show} = require('../controllers/aplinova.js');

const router = express.Router();

router.get('/', show);

module.exports = router;