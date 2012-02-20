var BytesHelper = require('../bytes_helper'),
    PasswordHelper = require('../password_helper'),
    ServerStatus = require('./server_status');

var CLIENT_LONG_PASSWORD = 1;
var CLIENT_FOUND_ROWS = 2;
var CLIENT_LONG_FLAG = 4;
var CLIENT_CONNECT_WITH_DB = 8;
var CLIENT_NO_SCHEMA = 16;
var CLIENT_COMPRESS = 32;
var CLIENT_ODBC = 64;
var CLIENT_LOCAL_FILES = 128;
var CLIENT_IGNORE_SPACE = 256;
var CLIENT_PROTOCOL_41 = 512;
var CLIENT_INTERACTIVE = 1024;
var CLIENT_SSL = 2048;
var CLIENT_IGNORE_SIGPIPE = 4096;
var CLIENT_TRANSACTIONS = 8192;
var CLIENT_RESERVED = 16384;
var CLIENT_SECURE_CONNECTION = 32768;
var CLIENT_MULTI_STATEMENTS = 65536;
var CLIENT_MULTI_RESULTS = 131072;

HandshakeInitializationPacket = module.exports = function() {
  this.protocolVersion    = 10;
  this.serverVersion      = "devnulldb";
  this.threadId           = 1;
  this.serverCapabilities = CLIENT_LONG_PASSWORD | CLIENT_FOUND_ROWS |
    CLIENT_NO_SCHEMA | CLIENT_IGNORE_SPACE | CLIENT_PROTOCOL_41 |
    CLIENT_INTERACTIVE | CLIENT_IGNORE_SIGPIPE | CLIENT_RESERVED |
    CLIENT_SECURE_CONNECTION;
  this.serverLanguage     = 8;

  this.serverStatus       = new ServerStatus();
  this.serverStatus.setAutoCommit(true);
};

HandshakeInitializationPacket.prototype.toBytes = function() {
  return BytesHelper.toLittleEndian(this.protocolVersion, 1) +
    this.serverVersion + "\x00" +
    BytesHelper.toLittleEndian(this.threadId, 4) +
    PasswordHelper.generateSalt(8) + "\x00" +
    BytesHelper.toBigEndian(this.serverCapabilities, 2) +
    BytesHelper.toLittleEndian(this.serverLanguage, 1) +
    this.serverStatus.toBytes() +
    "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00" + // unused buffer
    PasswordHelper.generateSalt(12) + "\x00";
};
