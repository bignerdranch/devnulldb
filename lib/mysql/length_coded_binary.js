var BytesHelper = require('./bytes_helper');

LengthCodedBinary = module.exports = function(value) {
  this.value = value;
};

LengthCodedBinary.prototype.toBytes = function() {
  if (this.value === null) {
    return BytesHelper.toLittleEndian(251, 1);
  } else if (this.value <= 250) {
    return BytesHelper.toLittleEndian(this.value, 1);
  } else if (this.value <= 65535) {
    return "\xFC" + BytesHelper.toLittleEndian(this.value, 2);
  } else if (this.value <= 16777215) {
    return "\xFD" + BytesHelper.toLittleEndian(this.value, 3);
  } else {
    // XXX: Bit shifting only works up to 32-bits in JS. Sucks for us, but
    // we are devnulldb after all so reliably doing this is not too important
    return "\xFE\x00\x00\x00\x00" + BytesHelper.toLittleEndian(this.value, 4);
  }
};
