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
});
