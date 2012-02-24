var assert = require('assert'),
    FieldPacket = require('../../../lib/mysql/packets/field_packet');

describe("FieldPacket", function() {
  var packet = new FieldPacket();

  describe("#toBytes", function() {
    it("properly encodes catalog", function() {
      assert.equal("\x03def", packet.toBytes().substr(0, 4));
    });

    it("properly encodes database name", function() {
      assert.equal("\x09devnulldb", packet.toBytes().substr(4, 10));
    });

    it("properly encodes table name", function() {
      assert.equal("\x09devnulldb", packet.toBytes().substr(14, 10));
    });

    it("properly encodes original table name", function() {
      assert.equal("\x09devnulldb", packet.toBytes().substr(24, 10));
    });

    it("properly encodes name", function() {
      assert.equal("\x02id", packet.toBytes().substr(34, 3));
    });

    it("properly encodes original name", function() {
      assert.equal("\x02id", packet.toBytes().substr(37, 3));
    });

    it("properly adds filler", function() {
      assert.equal("\x0C", packet.toBytes().substr(40, 1));
    });

    it("properly encodes character set number", function() {
      assert.equal("\x3F\x00", packet.toBytes().substr(41, 2));
    });

    it("properly encodes length", function() {
      assert.equal("\x0B\x00\x00\x00", packet.toBytes().substr(43, 4));
    });

    it("properly encodes type", function() {
      assert.equal("\x03", packet.toBytes().substr(47, 1));
    });

    it("properly encodes flags", function() {
      assert.equal("\x03\x00", packet.toBytes().substr(48, 2));
    });

    it("properly encodes decimals", function() {
      assert.equal("\x00", packet.toBytes().substr(50, 1));
    });

    it("properly encodes defaults", function() {
      assert.equal("\x00\x00", packet.toBytes().substr(51, 2));
    });
  });
});
