const { getModel, findByPage } = require('./util')
const postModel = require('../models/posts')

const { model, schema: PostSchema } = getModel(postModel, 'Posts', pre)
const queryItems = 'title abstract show pv ctime tag type'
const defaultMeta = {
  page: 1,
  limit: 20
}

function pre(Schema) {
  Schema.pre('save', function (next) {
    if (!this.modified) {
      this.pv = 0
      this.ctime = this.ctime || Date.now()
      this.status = 1
    }

    next()
  })

  Schema.statics.findByPage = findByPage
}

module.exports = {
  async create (postsObj) {
    const posts = new model(postsObj)
    return await posts.save()
  },
  async findList(query = {}) {
    return await model.find(query, queryItems)
  },
  async findListByPage(meta, query = {}) {
    return await model.findByPage(meta, query, queryItems, model)
  },
  async update (id, target) {
    return model.findByIdAndUpdate(id, target)
  },
  async remove (id){
    return this.update(id, {
      status: 0
    })
  }
}