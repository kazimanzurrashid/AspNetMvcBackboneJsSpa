exports = @
App = exports.Application or= {}
Views = App.Views or= {}
Models = App.Models

class Views.Profile extends Backbone.View
  changePasswordModelType: Models.ChangePassword
  sessionModelType: Models.Session
  el: '#profile-dialog'
  events:
    'shown': 'onDialogShown',
    'submit form': 'onChangePassword',
    'click #sign-out-button': 'onSignOut'

  initialize: ->
    @changePasswordForm = @$ 'form'
    @$el.modal show: false
    @listenTo App.events, 'showProfile', @onShowProfile

  onShowProfile: ->
    @changePasswordForm
      .resetFields()
      .hideSummaryError()
      .hideFieldErrors()

    @$el.modal 'show'

  onDialogShown: -> @changePasswordForm.putFocus()

  onChangePassword: (e) ->
    e.preventDefault()

    @changePasswordForm
      .hideSummaryError()
      .hideFieldErrors()

    model = new @changePasswordModelType

    Views.Helpers.subscribeModelInvalidEvent model, @changePasswordForm

    model.save @changePasswordForm.serializeFields(),
      success: =>
        @$el.modal 'hide'
        App.events.trigger 'passwordChanged'
      error: (m, jqxhr) =>
        if Views.Helpers.hasModelErrors jqxhr
          modelErrors = Views.Helpers.getModelErrors jqxhr
          if modelErrors
            return @changePasswordForm.showFieldErrors errors: modelErrors

        @changePasswordForm.showSummaryError
          message: 'An unexpected error has occurred while changing your ' +
            'password.'

  onSignOut: (e) ->
    e.preventDefault()
    @$el.modal 'hide'

    $.confirm
      prompt: 'Are you sure you want to sign out?'
      ok: =>
        (new @sessionModelType id: Date.now()).destroy
          success: -> App.events.trigger 'signedOut'