var BytesHelper = require('./bytes_helper');

LengthCodedBinary = module.exports = function(value) {
  this.value = value;
};

LengthCodedBinary.parse = function(data) {
  if (data[0] >= "\x00" && data[0] <= "\xFA") {
    return new LengthCodedBinary(data.charCodeAt(0));
  } else if (data[0] == "\xFB") {
    return new LengthCodedBinary(null);
  } else if (data[0] == "\xFC") {
    return new LengthCodedBinary(BytesHelper.fromLittleEndian(data, 1, 2));
  } else if (data[0] == "\xFD") {
    return new LengthCodedBinary(BytesHelper.fromLittleEndian(data, 1, 3));
  } else if (data[0] == "\xFE") {
    // XXX: Sucks again for us; we can only get up to 2^31-1 because JavaScript
    // uses 32-bit ints for bitwise operations.
    return new LengthCodedBinary(BytesHelper.fromLittleEndian(data, 5, 4));
  }
};

LengthCodedBinary.prototype.getValue = function() {
  return this.value;
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
