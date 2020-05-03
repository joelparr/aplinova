const express = require('express');
const router = express.Router();
const {isValid} = require('../../middlewares/isValidUser.js');
const {show, newCategoria} = require('../../controllers/admin/admin.js');

router.get('/', isValid, show);
router.post('/categoria', isValid, newCategoria)

module.exports = router;
