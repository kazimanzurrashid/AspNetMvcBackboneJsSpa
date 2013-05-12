exports = @
App = exports.Application or= {}
Views = App.Views or= {}
$ = jQuery

Views.Helpers = 
  hasModelErrors: (jqxhr) -> jqxhr.status is 400

  getModelErrors: (jqxhr) ->
    response = null

    try
      response = $.parseJSON jqxhr.responseText
    catch e

    return undefined unless response

    modelStateProperty = _(response)
      .chain()
      .keys()
      .filter((key) -> key.toLowerCase() is 'modelstate')
      .first()
      .value()

    if modelStateProperty then response[modelStateProperty] else undefined

  subscribeModelInvalidEvent: (model, el) ->
    model.once 'invalid', -> el.showFieldErrors errors: model.validationError