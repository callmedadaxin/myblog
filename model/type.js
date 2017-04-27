var Posts = require('./posts.js');

var getModal = require('./base.js');

var Type = getModal({
  type: String //类型名称
}, 'Type');

var model = Type.model;

module.exports = {
  insert: function(type) {
    return model.create(type);
  },

  delete: function(id) {
    return model.findByIdAndRemove(id);
  },

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

  findbyId(id) {
    return model.findById(id);
  }
}