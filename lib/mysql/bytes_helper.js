BytesHelper = module.exports = function() {
};

BytesHelper.toLittleEndian = function(number, bytes) {
  var representation = "";
  for (var i = 0; i < bytes; i++) {
    representation += String.fromCharCode((number >> (i * 8)) & 0xFF);
  }

  return representation;
};

BytesHelper.toBigEndian = function(number, bytes) {
  var representation = "";
  for (var i = 0; i < bytes; i++) {
    representation += String.fromCharCode(number >> ((bytes - i - 1) * 8) & 0xFF);
  }

  return representation;
};

BytesHelper.fromLittleEndian = function(str, offset, length) {
  var number = 0;
  for (var i = 0; i < length; i++) {
    var byteAsNumber = str.charCodeAt(offset + i);
    if (i == 3) {
      // Prevent us from going negative b/c we're dealing with signed 32-bit integers here
      byteAsNumber &= 0x7F;
    }

    number += byteAsNumber << (i * 8);
  }

  return number;
};
