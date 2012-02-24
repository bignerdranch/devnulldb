var BytesHelper = require('../bytes_helper');

FieldFlags = module.exports = function() {
  if (typeof arguments[0] !== "undefined") {
    this.flags = arguments[0];
  } else {
    this.flags = 0;
  }
};

FieldFlags.prototype.setNotNull = function(notNull) {
  if (notNull) {
    this.flags |= 0x0001;
  } else {
    this.flags &= ~0x0001;
  }
};

FieldFlags.prototype.setPrimaryKey = function(primaryKey) {
  if (primaryKey) {
    this.flags |= 0x0002;
  } else {
    this.flags &= ~0x0002;
  }
};

FieldFlags.prototype.toBytes = function() {
  return BytesHelper.toLittleEndian(this.flags, 2);
};
