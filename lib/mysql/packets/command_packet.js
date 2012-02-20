var BytesHelper = require('../bytes_helper');

CommandPacket = module.exports = function() {
  this.type = 0;
};

CommandPacket.parse = function(data) {
  var command = new CommandPacket();
  command.setType(BytesHelper.fromLittleEndian(data, 4, 1));

  return command;
};

CommandPacket.prototype.getType = function() {
  return this.type;
};

CommandPacket.prototype.setType = function(type) {
  this.type = type;
};
