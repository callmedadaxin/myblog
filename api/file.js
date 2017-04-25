var express = require('express');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var qiniu = require('qiniu');
var config = require('../config.js');
// var upload = multer({
//   dest: path.resolve(__dirname, '../uploadfiles/')
// });
var router = express.Router();

// router.post('/file-upload', upload.single('file'), function(req, res, next) {
//   var file = req.file;

//   res.json({
//     code: 200,
//     data: {
//       url: file.filename
//     }
//   })
// })

qiniu.conf.ACCESS_KEY = config.ACCESS_KEY;
qiniu.conf.SECRET_KEY = config.SECRET_KEY;

var uptoken = new qiniu.rs.PutPolicy(config.Bucket_Name);

router.get('/uptoken', function(req, res, next) {
  var token = uptoken.token();
  res.header("Cache-Control", "max-age=0, private, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", 0);
  if (token) {
    res.json({
      code: 200,
      data: {
        uptoken: token
      }
    });
  }
});

module.exports = router;