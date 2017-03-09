var express = require('express');
var router = express.Router();
var Tag = require('../model/tag.js');

//查询所有type
router.get('/', function(req, res, next) {
  Tag.findList().then(r => {
    res.json({
      code: 200,
      data: r
    })
  })
});

router.post('/add', function(req, res, next) {
  var tag = req.body.tag;

  Tag.insert({
    tag: tag
  }).then(r => {
    res.json({
      code: 200,
      data: r
    })
  }).catch(r => {
    res.json({
      code: 500,
      message: '添加失败！'
    })
  })
});

router.post('/delete', function(req, res, next) {
  var id = req.body.id;

  Tag.delete(id).then(r => {
    res.json({
      code: 200,
      message: '删除成功！'
    })
  }).catch(r => {
    res.json({
      code: 500,
      message: '删除失败！'
    })
  })
})

module.exports = router;