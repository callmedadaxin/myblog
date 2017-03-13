var Posts = require('./posts.js');

var getModal = require('./base.js');

var Tag = getModal({
  tag: String, //类型名称
}, 'Tag');

var model = Tag.model;

module.exports = {
  model: model,
  insert: function(tag) {
    return model.create(tag);
  },

  delete: function(id) {
    return model.findByIdAndRemove(id);
  },

  //标签列表
  findList: function() {
    return model.find({}).exec().then(r => {
      var res = r.map(function(elem) {
        return Posts.model.count({
            type: elem._id
          })
          .exec()
          .then(count => {
            return Object.assign(elem.toObject(), {
              num: count
            })
          })
      });

      return Promise.all(res).then(r => {
        return r;
      })
    })
  },
}