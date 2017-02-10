var mongoose = require('mongoose');
var getModal = require('./getmodal.js');

var Posts = getModal({
  title: String,
  content: String,
  abstract: String, //摘要
  show: String, //展示图片
  pv: Number, //展示pv
  ctime: String, //创建时间
  label: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Label'
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Type'
  }
}, 'Posts');

var model = Posts.model;

module.exports = {
  create: function(post) {
    return model.create(post);
  },

  remove: function(_id) {
    return model.findByIdAndRemove(_id);
  },

  updata: function(_id, update) {
    return model.findByIdAndUpdate(_id, update);
  },

  findList: function() {
    return model.find({}, 'title abstract show pv ctime label');
  },

  findById: function(_id) {
    return model.findById(_id);
  },
}