PasswordHelper = module.exports = function() {
};

PasswordHelper.generateSalt = function(length) {
  var charCode0 = "0".charCodeAt(0);
  var charCodez = "z".charCodeAt(0);

  var salt = "";
  for (var i = 0; i < length; i++) {
    salt += String.fromCharCode(Math.random() * (charCodez - charCode0) + charCode0);
  }

  return salt;
};
