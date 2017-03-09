var express = require('express');
var router = express.Router();
var Type = require('../model/type.js');

//查询所有type
router.get('/', function(req, res, next) {
  Type.findList().then(r => {
    res.json({
      code: 200,
      data: r
    })
  })
});

router.post('/add', function(req, res, next) {
  var type = req.body.type;

  Type.insert({
    type: type
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

  Type.delete(id).then(r => {
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