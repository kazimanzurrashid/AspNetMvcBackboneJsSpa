exports = @
App = exports.Application or= {}
Models = App.Models or= {}

class Models.Session extends Backbone.Model
  urlRoot: -> App.serverUrlPrefix + '/sessions'

  defaults: ->
    email: null
    password: null
    rememberMe: false

  validate: (attributes) ->
    Validation = Models.Validation
    errors = {}

    unless attributes.email
      Validation.addError errors, 'email', 'Email is required.'

    unless attributes.password
      Validation.addError errors, 'password', 'Password is required.'

    if _(errors).isEmpty() then undefined else errors