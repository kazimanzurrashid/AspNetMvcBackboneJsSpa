exports = @
App = exports.Application or= {}
Models = App.Models or= {}

class Models.ForgotPassword extends Backbone.Model
  urlRoot: -> App.serverUrlPrefix + '/password/forgot'

  defaults: ->
    email: null

  validate: (attributes) ->
    Validation = Models.Validation
    errors = {}

    if attributes.email
      unless Validation.isValidEmailFormat attributes.email
        Validation.addError errors, 'email', 'Invalid email address format.'
    else
      Validation.addError errors, 'email', 'Email is required.'

    if _(errors).isEmpty() then undefined else errors