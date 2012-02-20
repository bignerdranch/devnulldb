var assert = require('assert'),
    PacketHeader = require('../../../lib/mysql/packets/packet_header');

describe("PacketHeader", function() {
  describe("#toBytes", function() {
    it("properly encodes packet length and packet number", function() {
      var header = new PacketHeader();
      header.setLength(98303);
      header.setNumber(3);

      assert.equal("\xFF\x7F\x01\x03", header.toBytes());
    });
  });

  describe(".parse", function() {
    it("parses packet length", function() {
      var header = PacketHeader.parse("\xFF\x7F\x01\x03");

      assert.equal(98303, header.getLength());
    });

    it("parses packet number", function() {
      var header = PacketHeader.parse("\xFF\x7F\x01\x03");

      assert.equal(3, header.getNumber());
    });
  });
});
