var express = require('express');
var router = express.Router();

var shortenController = require('../controllers/shortenController');

router.get('*', shortenController.shorten);

module.exports = router;