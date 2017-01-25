var express = require('express');
var router = express.Router();

var checkLogin = require('../middleware/checkLogin.js').checkLogin;

router.post('/', checkLogin, function(req, res, next) {
  res.send(req.flash());
});

module.exports = router;