var assert = require('assert'),
    OkPacket = require('../../../lib/mysql/packets/ok_packet');

describe("OkPacket", function() {
  var packet = new OkPacket();

  describe("#toBytes", function() {
    it("properly encodes field count", function() {
      assert.equal("\x00", packet.toBytes().substr(0, 1));
    });

    it("properly encodes affected rows", function() {
      assert.equal("\x00", packet.toBytes().substr(1, 1));
    });

    it("properly encodes insert id", function() {
      assert.equal("\x00", packet.toBytes().substr(2, 1));
    });

    it("properly encodes server status", function() {
      assert.equal("\x02\x00", packet.toBytes().substr(3, 2));
    });

    it("properly encodes warnings", function() {
      assert.equal("\x00\x00", packet.toBytes().substr(5, 2));
    });
  });
});
