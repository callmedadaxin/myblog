var getModal = require('./getmodal.js');

var Label = getModal({
  label: String //标签名
}, 'Label');

module.exports = Label.model;