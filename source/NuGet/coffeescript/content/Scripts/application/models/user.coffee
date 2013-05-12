exports = @
App = exports.Application or= {}
Models = App.Models or= {}

class Models.User extends Backbone.Model
  urlRoot: -> App.serverUrlPrefix + '/users'

  defaults: ->
    email: null,
    password: null,
    confirmPassword: null

  validate: (attributes) ->
    Validation = Models.Validation
    errors = {}

    if attributes.email
      unless Validation.isValidEmailFormat attributes.email
        Validation.addError errors, 'email', 'Invalid email address format.'
    else
      Validation.addError errors, 'email', 'Email is required.'

    if attributes.password
      unless Validation.isValidPasswordLength attributes.password
        Validation.addError errors,
          'password',
          'Password length must be between 6 to 64 characters.'
    else
      Validation.addError errors, 'password', 'Password is required.'

    if attributes.confirmPassword
      if attributes.confirmPassword isnt attributes.password
        Validation.addError errors,
          'confirmPassword',
          'Password and confirm password do not match.'
    else
      Validation.addError errors,
        'confirmPassword',
        'Confirm password is required.'

    if _(errors).isEmpty() then undefined else errors