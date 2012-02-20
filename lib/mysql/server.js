var events = require('events'),
    PacketHeader = require('./packets/packet_header'),
    HandshakeInitializationPacket = require('./packets/handshake_initialization_packet'),
    ClientAuthenticationPacket = require('./packets/client_authentication_packet'),
    OkPacket = require('./packets/ok_packet');

Server = module.exports = function(socket) {
  this.socket        = socket;
  this.authenticated = false;

  this.on("packet", this.onPacket.bind(this));

  this.socket.on("connect", function() {
    this.socket.setEncoding("binary");
    this.socket.packetNumber = 0;

    this.sendPacket(new HandshakeInitializationPacket());
  }.bind(this));

  this.socket.on("data", function(data) {
    this.socket.packetNumber++;

    var packet;
    if (!this.authenticated) {
      packet = new ClientAuthenticationPacket(data);
    } else {
      // Parse other packet types
    }

    if (packet) {
      this.emit("packet", packet);
    }
  }.bind(this));
};

Server.prototype = new events.EventEmitter;

Server.prototype.onPacket = function(packet) {
  if (packet.constructor === ClientAuthenticationPacket) {
    this.sendPacket(new OkPacket());
    this.authenticated = true;
  }
};

Server.prototype.sendPacket = function(packet) {
  var bytes = packet.toBytes();

  var packetHeader = new PacketHeader();
  packetHeader.setLength(bytes.length);
  packetHeader.setNumber(this.socket.packetNumber++);

  this.socket.write(packetHeader.toBytes() + packet.toBytes(), "binary");
};
