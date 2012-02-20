var assert = require('assert'),
    CommandPacket = require('../../../lib/mysql/packets/command_packet');

describe("CommandPacket", function() {
  describe(".parse", function() {
    it("correctly parses the command type", function() {
      var packet = CommandPacket.parse("\x01\x00\x00\x00\x01"); // QUIT packet

      assert.equal(1, packet.getType());
    });
  });
});
