const config = require('../../config')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const db = mongoose.createConnection(config.mongodb)

exports.getModel = (obj, name, pre) => {
  const schema = new Schema(obj)
  pre && pre(schema)
  const model = db.model(name, schema, name)
  return {
    schema,
    model
  }
}

const defaultMeta = {
  page: 1,
  limit: 20
}

/**
 * find by pages for schema
 * @param {Object} meta 
 * @param {Object} query 
 */
exports.findByPage = async function (meta, query = {}, queryItems, model) {
  const total = await this.count(query)
  const retMeta = Object.assign({}, defaultMeta, meta)
  const { page, limit } = retMeta
  const start = (page - 1) * limit
  const totalPage = Math.ceil(total / limit)

  const list = await model.find(query, queryItems).sort({
    ctime: -1
  })
    .skip(start)
    .limit(limit)
    .exec()
  return {
    data: list,
    meta: {
      page,
      limit,
      total,
      totalPage
    }
  }
}