var assert = require('assert'),
    ResultSetHeaderPacket = require('../../../lib/mysql/packets/result_set_header_packet');

describe("ResultSetHeaderPacket", function() {
  var packet = new ResultSetHeaderPacket();

  describe("#toBytes", function() {
    it("properly encodes field count", function() {
      packet.setFieldCount(2);
      assert.equal("\x02", packet.toBytes().substr(0, 1));
    });
  });
});
