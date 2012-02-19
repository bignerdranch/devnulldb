var BytesHelper = require('../bytes_helper');

PacketHeader = module.exports = function() {
  this.length = 0;
  this.number = 0;
};

PacketHeader.prototype.setLength = function(length) {
  this.length = length;
};

PacketHeader.prototype.setNumber = function(number) {
  this.number = number;
};

PacketHeader.prototype.toBytes = function() {
  return BytesHelper.toLittleEndian(this.length, 3) +
    BytesHelper.toLittleEndian(this.number, 1);
};
