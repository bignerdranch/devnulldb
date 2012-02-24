var assert = require('assert'),
    CommandPacket = require('../../../lib/mysql/packets/command_packet');

describe("CommandPacket", function() {
  describe(".parse", function() {
    it("correctly parses the command type", function() {
      var packet = CommandPacket.parse("\x01\x00\x00\x00\x01"); // QUIT packet

      assert.equal(1, packet.getType());
    });

    it("correctly parses the command argument", function() {
      var packet = CommandPacket.parse("\x0F\x00\x00\x00\x03" + // QUERY packet
                                       "show databases");

      assert.equal("show databases", packet.getArgument());
    });
  });

  describe("#isQuery", function() {
    it("returns true when the command is a query (3)", function() {
      var packet = CommandPacket.parse("\x0F\x00\x00\x00\x03" + // QUERY packet
                                       "show databases");

      assert.ok(packet.isQuery());
    });
  });
});
