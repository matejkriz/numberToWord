var express = require('express');
var router = express.Router();
var t9 = require('./t9');

/* GET word from number. */
router.get('/t9', t9.getWordFromNumber);

module.exports = router;
