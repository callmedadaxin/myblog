var express = require('express');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var upload = multer({
  dest: path.resolve(__dirname, '../uploadfiles/')
});
var router = express.Router();

router.post('/file-upload', upload.single('file'), function(req, res, next) {
  var file = req.file;

  res.json({
    code: 200,
    data: {
      url: file.filename
    }
  })
})

module.exports = router;