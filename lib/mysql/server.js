var events = require('events'),
    PacketHeader = require('./packets/packet_header'),
    HandshakeInitializationPacket = require('./packets/handshake_initialization_packet');

Server = module.exports = function(socket) {
  this.socket        = socket;
  this.authenticated = false;

  this.on("packet", this.onPacket.bind(this));

  this.socket.on("connect", function() {
    this.socket.setEncoding("binary");

    this.sendPacket(new HandshakeInitializationPacket());
  }.bind(this));

  this.socket.on("data", function(data) {
    var packet;
    if (!this.authenticated) {
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
  var bytes = packet.toBytes();

  var packetHeader = new PacketHeader();
  packetHeader.setLength(bytes.length);
  packetHeader.setNumber(0);

  this.socket.write(packetHeader.toBytes() + packet.toBytes(), "binary");
};
