exports = @
App = exports.Application or= {}
Views = App.Views or= {}

class Views.Page extends Backbone.View

  initialize: (options) ->
    @template = options.template
    @listenTo @model, 'change', @render
    @listenTo @model, 'destroy', @remove

  render: ->
    @$el.html @template(@model.toJSON())
    @

_(Views.Page.prototype).extend Views.Activable