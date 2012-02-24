var ServerStatus = require('./server_status');

EofPacket = module.exports = function() {
  this.warningCount = 0;

  this.serverStatus = new ServerStatus();
  this.serverStatus.setAutoCommit(true);
};

EofPacket.prototype.setWarningCount = function(warningCount) {
  this.warningCount = warningCount;
};

EofPacket.prototype.getWarningCount = function() {
  return this.warningCount;
};

EofPacket.prototype.toBytes = function() {
  return "\xFE" +
    BytesHelper.toLittleEndian(this.warningCount, 2) +
    this.serverStatus.toBytes();
};
