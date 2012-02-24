var events = require('events'),
    PacketHeader = require('./packets/packet_header'),
    HandshakeInitializationPacket = require('./packets/handshake_initialization_packet'),
    ClientAuthenticationPacket = require('./packets/client_authentication_packet'),
    CommandPacket = require('./packets/command_packet'),
    OkPacket = require('./packets/ok_packet'),
    ScenarioGenerator = require('./scenario_generator');

Server = module.exports = function(socket) {
  this.socket        = socket;
  this.authenticated = false;

  this.on("packet", this.onPacket.bind(this));

  this.socket.on("connect", function() {
    this.socket.setEncoding("binary");
    this.socket.nextPacketNumber = 0;

    this.sendPacket(new HandshakeInitializationPacket());
  }.bind(this));

  this.socket.on("data", function(data) {
    var header = PacketHeader.parse(data);

    var packet;
    if (!this.authenticated) {
      packet = ClientAuthenticationPacket.parse(data);
    } else {
      packet = CommandPacket.parse(data);
    }

    if (packet) {
      this.emit("packet", header, packet);
    }
  }.bind(this));
};

Server.prototype = new events.EventEmitter;

Server.prototype.onPacket = function(header, packet) {
  this.socket.nextPacketNumber = header.getNumber() + 1;

  if (packet.constructor === ClientAuthenticationPacket) {
    this.sendPacket(new OkPacket());
    this.authenticated = true;
  } else if (packet.constructor === CommandPacket) {
    if (packet.isQuery()) {
      this.sendPackets(ScenarioGenerator.responseWithOneIdColumnAndZeroRows());
    }
  }
};

Server.prototype.sendPacket = function(packet) {
  this.sendPackets([packet]);
};

Server.prototype.sendPackets = function(packets) {
  var message = "";

  for (var i = 0; i < packets.length; i++) {
    var packet = packets[i];

    var bytes = packet.toBytes();

    var packetHeader = new PacketHeader();
    packetHeader.setLength(bytes.length);
    packetHeader.setNumber(this.socket.nextPacketNumber++);

    message += (packetHeader.toBytes() + packet.toBytes());
  }

  this.socket.write(message, "binary");
};
