var LengthCodedBinary = require('./length_coded_binary');

LengthCodedString = module.exports = function(value) {
  this.value = value;
};

LengthCodedString.prototype.toBytes = function() {
  return new LengthCodedBinary(this.value.length).toBytes() +
    this.value;
};
