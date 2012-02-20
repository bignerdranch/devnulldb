var events = require('events'),
    HandshakeInitializationPacket = require('./packets/handshake_initialization_packet'),

Server = module.exports = function(socket) {
  this.socket        = socket;
  this.authenticated = false;

  this.on("packet", this.onPacket.bind(this));

  this.socket.on("connect", function() {
  });

  this.socket.on("data", function(data) {
    var packet;
    if (!this.authenticated) {
      this.sendPacket(new HandshakeInitializationPacket());
    }

    if (packet) {
      this.emit("packet", packet);
    }
  }.bind(this));
};

Server.prototype = new events.EventEmitter;

Server.prototype.onPacket = function(packet) {
};

Server.prototype.sendPacket = function(packet) {
  this.socket.write(packet.toBytes());
};
