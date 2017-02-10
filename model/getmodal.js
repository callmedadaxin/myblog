var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  config = require('../config.js');

mongoose.Promise = global.Promise;
var db = mongoose.createConnection(config.mongodb);

module.exports = function(modal, name) {
  var schema = new Schema(modal),
    model = db.model(name, schema, name);

  return {
    schema: schema,
    model: model
  }
}