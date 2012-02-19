BytesHelper = module.exports = function() {
};

BytesHelper.toLittleEndian = function(number, bytes) {
  var representation = "";
  for (var i = 0; i < bytes; i++) {
    representation += String.fromCharCode((number >> (i * 8)) & 0xFF);
  }

  return representation;
};
