const { getModel } = require('./util')
const postModel = require('../models/posts')

const { model, schema } = getModel(postModel, 'Posts')

module.exports = {
  async findList(query = {}) {
    const result = await model.find(query, 'title abstract show pv ctime tag type')
    console.log(result)
    return result
  }
}