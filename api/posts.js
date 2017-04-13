var express = require('express');
var router = express.Router();
var Posts = require('../model/posts.js');

router.post('/', function(req, res, next) {
  var meta = {
    page: parseInt(req.body.page),
    limit: parseInt(req.body.limit)
  };

  var type = req.body.type,
    tag = req.body.tag,
    query = {};

  type ? query.type = type : '';
  tag ? query.tag = {
    $in: [tag]
  } : '';

  Posts.findListByPage(meta, query).then(function(data) {
    res.json({
      code: 200,
      data: data
    });
  }).catch(function(err) {
    console.log(err);
    res.json({
      code: 500,
      message: '查询失败！'
    })
  })
});

router.post('/detail', function(req, res, next) {
  var _id = req.body.id;

  Posts.findById(_id).then(function(data) {
    res.json({
      code: 200,
      data: data
    });
  }).catch(function(err) {
    console.log(err);
    res.json({
      code: 500,
      message: '获取失败，请重试！'
    })
  })
});

//发表文章
router.post('/add', function(req, res, next) {
  var title = req.body.title,
    content = req.body.content,
    abstract = req.body.abstract,
    show = req.body.show,
    pv = 0,
    tag = req.body['tag[]'],
    type = req.body.type;

  Posts.create({
    title: title,
    content: content,
    abstract: abstract,
    show: show,
    pv: pv,
    tag: tag,
    type: type
  }).then(r => {
    res.json({
      code: 200,
      data: r
    })
  }).catch(r => {
    console.log(r);
    res.json({
      code: 500,
      message: '添加失败！'
    })
  })
});

router.post('/update', function(req, res, next) {
  var id = req.body.id,
    title = req.body.title,
    content = req.body.content,
    abstract = req.body.abstract,
    show = req.body.show,
    tag = req.body['tag[]'],
    type = req.body.type;

  Posts.update(id, {
    title: title,
    content: content,
    abstract: abstract,
    show: show,
    tag: tag,
    type: type
  }).then(r => {
    res.json({
      code: 200,
      data: r
    })
  })
})

router.post('/delete', function(req, res, next) {
  var id = req.body.id;

  Posts.remove(id).then(r => {
    res.json({
      code: 200,
      data: r
    })
  })
})

module.exports = router;