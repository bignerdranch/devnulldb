var assert = require('assert'),
    EofPacket = require('../../../lib/mysql/packets/eof_packet');

describe("EofPacket", function() {
  var packet = new EofPacket();

  describe("#toBytes", function() {
    it("properly encodes field count (always 0xFE)", function() {
      assert.equal("\xFE", packet.toBytes().substr(0, 1));
    });

    it("properly encodes warning count", function() {
      packet.setWarningCount(600);

      assert.equal("\x58\x02", packet.toBytes().substr(1, 2));
    });

    it("properly encodes server status", function() {
      assert.equal("\x02\x00", packet.toBytes().substr(3, 2));
    });
  });
});
