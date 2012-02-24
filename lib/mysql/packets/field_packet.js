var BytesHelper = require('../bytes_helper'),
    LengthCodedString = require('../length_coded_string'),
    FieldFlags = require('./field_flags');

FieldPacket = module.exports = function() {
  this.catalog   = "def";
  this.db        = "devnulldb";
  this.table     = "devnulldb";
  this.origTable = "devnulldb";
  this.name      = "id";
  this.origName  = "id";
  this.charset   = 63; // binary
  this.length    = 11;
  this.type      = 3; // long

  this.flags     = new FieldFlags();
  this.flags.setNotNull(true);
  this.flags.setPrimaryKey(true);

  this.decimals  = 0;
};

FieldPacket.prototype.toBytes = function() {
  return new LengthCodedString(this.catalog).toBytes() +
    new LengthCodedString(this.db).toBytes() +
    new LengthCodedString(this.table).toBytes() +
    new LengthCodedString(this.origTable).toBytes() +
    new LengthCodedString(this.name).toBytes() +
    new LengthCodedString(this.origName).toBytes() +
    "\x0C" +
    BytesHelper.toLittleEndian(this.charset, 2) +
    BytesHelper.toLittleEndian(this.length, 4) +
    BytesHelper.toLittleEndian(this.type, 1) +
    this.flags.toBytes() +
    BytesHelper.toLittleEndian(this.decimals, 1) +
    "\x00\x00";
};
