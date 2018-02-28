const mongoose = require('mongoose')
const Schema = mongoose.Schema

exports.getModel = (obj, name) => {
  console.log(obj)
  const schema = new Schema(obj)
  const model = mongoose.model(name, schema)
  return {
    schema,
    model
  }
}