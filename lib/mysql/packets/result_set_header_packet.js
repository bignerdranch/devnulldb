var BytesHelper = require('../bytes_helper');

ResultSetHeaderPacket = module.exports = function() {
  this.fieldCount = 0;
};

ResultSetHeaderPacket.prototype.setFieldCount = function(fieldCount) {
  this.fieldCount = fieldCount;
};

ResultSetHeaderPacket.prototype.getFieldCount = function() {
  return this.fieldCount;
};

ResultSetHeaderPacket.prototype.toBytes = function() {
  return new LengthCodedBinary(this.fieldCount).toBytes();
};
