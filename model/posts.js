var mongoose = require('mongoose');
var getModal = require('./base.js');
var marked = require('marked');
var highlight = require('highlight.js');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function(code) {
    return highlight.highlightAuto(code).value;
  }
});

var Posts = getModal({
  title: String,
  content: String,
  abstract: String, //摘要
  show: String, //展示图片
  pv: Number, //展示pv
  ctime: String, //创建时间
  status: Number, //状态
  tag: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Tag'
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Type'
  }
}, 'Posts');

var model = Posts.model,
  schema = Posts.schema,
  defaultMeta = {
    page: 1,
    limit: 20
  };


module.exports = {
  model: model,
  create: function(post) {
    var tags = post.tags;

    post.pv = 0;
    post.date = new Date();
    post.status = 1;

    delete post.tag;

    return model.create(post);
  },

  remove: function(_id) {
    return this.update(_id, {
      status: 0
    });
  },

  update: function(_id, update) {

    for (var key in update) {
      var value = update[key];

      if (!value && value !== 0) {
        delete update[key];
      }
    }

    return model.findByIdAndUpdate(_id, update);
  },

  findList: function() {
    return model.find({
      status: 1
    }, 'title abstract show pv ctime label');
  },

  findListByPage: function(meta, query) {
    var newMeta = Object.assign(defaultMeta, meta),
      start = (newMeta.page - 1) * newMeta.limit;

    query.status = 1;

    return model
      .find(query, 'title abstract show pv ctime tag type')
      .sort({
        ctime: -1
      })
      .skip(start)
      .limit(newMeta.limit)
      .exec()
      .then(function(data) {
        return model.count(query)
          .exec()
          .then(function(count) {
            newMeta.pages = Math.ceil(count / 4);

            return {
              list: data,
              meta: newMeta
            }
          })
      })
  },

  // findListByType: function (type, meta) {
  //   return this.findListByPage(meta, {type: })
  // }

  findById: function(_id) {
    return model.findById(_id).then(function(posts) {
      posts.content = marked(posts.content);

      return posts;
    });
  },
}