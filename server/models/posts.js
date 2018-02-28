const mongoose = require('mongoose')

module.exports = {
  title: String,
  content: String,
  abstract: String,
  show: String,
  pv: Number,
  ctime: String,
  status: Number,
  tag: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Tag'
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Type'
  }
}