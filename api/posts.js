var express = require('express');
var router = express.Router();
var Posts = require('../model/posts.js');

router.post('/', function(req, res, next) {
  Posts.findList().then(function(data) {
    res.json({
      code: 200,
      data: data
    });
  }).catch(function(err) {
    console.log(err);
  })
});

module.exports = router;