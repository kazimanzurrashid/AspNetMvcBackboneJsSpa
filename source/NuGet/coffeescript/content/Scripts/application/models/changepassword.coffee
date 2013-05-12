exports = @
App = exports.Application or= {}
Models = App.Models or= {}

class Models.ChangePassword extends Backbone.Model
  urlRoot: -> App.serverUrlPrefix + '/password/change'

  defaults: ->
    oldPassword: null
    newPassword: null
    confirmPassword: null

  validate: (attributes) ->
    Validation = Models.Validation
    errors = {}

    unless attributes.oldPassword
      Validation.addError errors, 'oldPassword', 'Old password is required.'
 
    if attributes.newPassword
      unless Validation.isValidPasswordLength attributes.newPassword
        Validation.addError errors,
          'newPassword',
          'New password length must be between 6 to 64 characters.'
    else
      Validation.addError errors, 'newPassword', 'New password is required.'

    if attributes.confirmPassword
      if attributes.confirmPassword isnt attributes.newPassword
        Validation.addError errors,
          'confirmPassword',
          'New password and confirm password do not match.'
    else
      Validation.addError errors,
        'confirmPassword',
        'Confirm password is required.'

    if _(errors).isEmpty() then undefined else errors