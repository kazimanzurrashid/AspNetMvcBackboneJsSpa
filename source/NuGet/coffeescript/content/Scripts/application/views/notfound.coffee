exports = @
App = exports.Application or= {}
Views = App.Views or= {}

class Views.NotFound extends Backbone.View
  el: '#not-found-page'

_(Views.NotFound.prototype).extend Views.Activable