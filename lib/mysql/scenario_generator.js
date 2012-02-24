var ResultSetHeaderPacket = require('./packets/result_set_header_packet'),
    EofPacket = require('./packets/eof_packet'),
    FieldPacket = require('./packets/field_packet');

ScenarioGenerator = module.exports = function() {
};

ScenarioGenerator.responseWithOneIdColumnAndZeroRows = function() {
  var resultSet = new ResultSetHeaderPacket();
  resultSet.setFieldCount(1);

  var fieldPacket = new FieldPacket();

  return [
    resultSet,
    fieldPacket,
    new EofPacket(),
    // No results evar!
    new EofPacket()
  ];
};
