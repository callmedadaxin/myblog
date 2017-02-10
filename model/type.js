var getModal = require('./getmodal.js');

var Type = getModal({
  type: String //类型名称
}, 'Type');

module.exports = Type.model;