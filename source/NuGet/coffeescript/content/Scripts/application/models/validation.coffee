exports = @
App = exports.Application or= {}
Models = App.Models or= {}

emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/

Models.Validation = 
  addError: (errors, attribute, message) ->
    (errors[attribute] or= []).push message

  isValidEmailFormat: (value) -> value and emailRegex.test value

  isValidPasswordLength: (value) ->
    value and value.length >= 6 and value.length <= 64