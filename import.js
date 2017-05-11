require('es6-promise').polyfill()
var config = require('./config.js');
var mongoose = require('mongoose'),
  fs = require('fs'),
  path = require('path'),
  Posts = require('./model/posts.js');

var filePath = '/Users/wangxiaoxin/Documents/Hexo/source/_posts';

fs.readdir(filePath, function(err, files) {
  if (err) {
    console.log(err);
    return;
  }

  files.forEach(function(fileName, index) {
    if (fileName == '.DS_Store') {
      return;
    }

    var target = path.join(filePath, fileName);

    fs.stat(target, function(err, stat) {
      if (err) {
        console.log(err);
        return;
      }

      readFile(target).then(function(data) {
        savaPosts(fileName, stat, data);
      }, function() {
        console.log('导入失败！' + target);
      })
    })
  });
});

function readFile(fileName) {
  return new Promise(function(resolve, reject) {
    fs.readFile(fileName, 'utf-8', function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  })
}

function savaPosts(fileName, stat, data) {
  var post = {
    title: fileName.replace('.md', ''),
    content: data,
    abstract: '这是文章摘要文章摘要',
    show: 'https://tympanus.net/Development/3DGridEffect/img/2.jpg',
    ctime: stat.ctime.getTime(),
    tags: []
  }

  Posts.create(post).then(function(data) {
    console.log('成功保存：' + fileName)
  }, function(err) {
    console.log(err);
  })
}

function deleteAll() {
  Posts.model.find().then(r => {
    r.forEach(post => {
      Posts.model.findByIdAndRemove(post._id).then(r => {
        console.log('delete' + post._id);
      }).catch(e => {
        console.log(e);
      })
    })
  })
}