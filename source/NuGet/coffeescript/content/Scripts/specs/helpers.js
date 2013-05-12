(function() {
  var App, exports;

  exports = this;

  App = exports.Application || (exports.Application = {});

  App.clientUrlPrefix = '#!/';

  App.serverUrlPrefix = '/api';

  exports.repeatString = function(length, character) {
    if (length == null) {
      length = 1;
    }
    if (character == null) {
      character = 'x';
    }
    return (new Array(length + 1)).join(character);
  };

}).call(this);
