var BytesHelper = require('../bytes_helper');

CommandPacket = module.exports = function() {
  this.type     = 0;
  this.argument = null;
};

CommandPacket.parse = function(data) {
  var command = new CommandPacket();
  command.setType(BytesHelper.fromLittleEndian(data, 4, 1));
  command.setArgument(data.substr(5));

  return command;
};

CommandPacket.prototype.getType = function() {
  return this.type;
};

CommandPacket.prototype.setType = function(type) {
  this.type = type;
};

CommandPacket.prototype.getArgument = function() {
  return this.argument;
};

CommandPacket.prototype.setArgument = function(argument) {
  this.argument = argument;
};
