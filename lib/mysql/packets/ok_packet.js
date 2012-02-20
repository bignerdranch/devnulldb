var BytesHelper = require('../bytes_helper'),
    LengthCodedBinary = require('../length_coded_binary');

OkPacket = module.exports = function() {
  this.affectedRows = 0;
  this.insertId     = 0;

  this.serverStatus = new ServerStatus();
  this.serverStatus.setAutoCommit(true);

  this.warnings     = 0;
};

OkPacket.prototype.toBytes = function() {
  return "\x00" + // field count is always zero
    new LengthCodedBinary(this.affectedRows).toBytes() +
    new LengthCodedBinary(this.insertId).toBytes() +
    this.serverStatus.toBytes() +
    BytesHelper.toLittleEndian(this.warnings, 2);
};
