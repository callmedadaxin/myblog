var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: '王卫新的博客'
  });
});

router.get('/admin', function(req, res, next) {
  res.render('admin', {
    title: '博客管理后台'
  });
});

module.exports = router;