const express = require('express');
const router = express.Router();
const {show} = require('../../controllers/admin/admin.js');

router.get('/', show);

module.exports = router;
