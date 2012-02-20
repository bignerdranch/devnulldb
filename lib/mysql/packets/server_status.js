var BytesHelper = require('../bytes_helper');

ServerStatus = module.exports = function() {
  if (typeof arguments[0] !== "undefined") {
    this.status = arguments[0];
  } else {
    this.status = 0;
  }
};

ServerStatus.prototype.setAutoCommit = function(autoCommit) {
  if (autoCommit) {
    this.status |= 0x0002;
  } else {
    this.status &= ~0x0002;
  }
};

ServerStatus.prototype.toBytes = function() {
  return BytesHelper.toLittleEndian(this.status, 2);
};
