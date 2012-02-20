var BytesHelper = require('../bytes_helper');

PacketHeader = module.exports = function() {
  this.length = 0;
  this.number = 0;
};

PacketHeader.parse = function(data) {
  var header = new PacketHeader();
  header.setLength(BytesHelper.fromLittleEndian(data, 0, 3));
  header.setNumber(BytesHelper.fromLittleEndian(data, 3, 1));

  return header;
};

PacketHeader.prototype.getLength = function() {
  return this.length;
};

PacketHeader.prototype.setLength = function(length) {
  this.length = length;
};

PacketHeader.prototype.getNumber = function() {
  return this.number;
};

PacketHeader.prototype.setNumber = function(number) {
  this.number = number;
};

PacketHeader.prototype.toBytes = function() {
  return BytesHelper.toLittleEndian(this.length, 3) +
    BytesHelper.toLittleEndian(this.number, 1);
};
