exports = @
App = exports.Application or= {}
App.clientUrlPrefix = '#!/'
App.serverUrlPrefix = '/api'

exports.repeatString = (length = 1, character = 'x') ->
  (new Array(length + 1)).join character