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
    number += str.charCodeAt(offset + i) << (i * 8);
  }

  return number;
};
