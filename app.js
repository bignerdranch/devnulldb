var net = require('net'),
    MySQLServer = require('./lib/mysql/server');

var mySQLSocket = net.createServer(function(connection) {
  console.log("New Connection!");
  var mySQLServer = new MySQLServer(connection);
});
mySQLSocket.listen(3306);
