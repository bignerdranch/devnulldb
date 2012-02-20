var assert = require('assert'),
    HandshakeInitializationPacket = require('../../../lib/mysql/packets/handshake_initialization_packet');

describe("HandshakeInitializationPacket", function() {
  var packet = new HandshakeInitializationPacket();

  describe("#toBytes", function() {
    it("properly encodes protocol version", function() {
      assert.equal("\x0A", packet.toBytes().substr(0, 1));
    });

    it("properly encodes server version", function() {
      assert.equal("devnulldb\x00", packet.toBytes().substr(1, 10));
    });

    it("properly encodes thread ID", function() {
      assert.equal("\x01\x00\x00\x00", packet.toBytes().substr(11, 4));
    });

    it("properly encodes server capabilities", function() {
      assert.equal("\xD7\x13", packet.toBytes().substr(24, 2));
    });

    it("properly encodes server language", function() {
      assert.equal("\x08", packet.toBytes().substr(26, 1));
    });

    it("properly encodes server status", function() {
      assert.equal("\x00\x02", packet.toBytes().substr(27, 2));
    });

    it("properly encodes the unused buffer", function() {
      assert.equal("\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00", packet.toBytes().substr(29, 13));
    });
  });
});
