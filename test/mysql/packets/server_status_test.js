var assert = require('assert'),
    ServerStatus = require('../../../lib/mysql/packets/server_status');

describe("ServerStatus", function() {
  describe("auto commit", function() {
    it("sets autocommit as true", function() {
      var status = new ServerStatus(0);
      status.setAutoCommit(true);

      assert.equal("\x02\x00", status.toBytes());
    });

    it("sets autocommit as false", function() {
      var status = new ServerStatus(2);
      status.setAutoCommit(false);

      assert.equal("\x00\x00", status.toBytes());
    });
  });
});
