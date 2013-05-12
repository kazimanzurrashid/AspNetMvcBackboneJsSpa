exports = @
App = exports.Application or= {}
Views = App.Views or= {}
Models = App.Models

class Views.MembershipChildForm extends Backbone.View
  events: { 'submit': 'onSubmit' }
  modelType: null
  successEvent: null

  handleError: (jqxhr) ->
    throw new Error 'Not Implemented'

  onSubmit: (e) ->
    e.preventDefault()
    @$el.hideSummaryError().hideFieldErrors()

    model = new @modelType
    Views.Helpers.subscribeModelInvalidEvent model, @$el

    model.save @$el.serializeFields(),
      success: => App.events.trigger @successEvent
      error: (m, jqxhr) => @handleError jqxhr


class Views.SignIn extends Views.MembershipChildForm
  el:'#sign-in-form'
  modelType: Models.Session
  successEvent: 'signedIn'

  handleError: (jqxhr) ->
    message = if Views.Helpers.hasModelErrors jqxhr
        'Invalid credentials.'
      else
        'An unexpected error has occurred while signing in.'

    @$el.showSummaryError { message }


class Views.ForgotPassword extends Views.MembershipChildForm
  el:'#forgot-password-form'
  modelType: Models.ForgotPassword
  successEvent: 'passwordResetRequested'

  handleError: ->
    @$el.showSummaryError
      message: 'An unexpected error has occurred while requesting password ' +
       'reset.'


class Views.SignUp extends Views.MembershipChildForm
  el:'#sign-up-form'
  modelType: Models.User
  successEvent: 'signedUp'

  handleError: (jqxhr) ->
    if Views.Helpers.hasModelErrors jqxhr
      modelErrors = Views.Helpers.getModelErrors jqxhr
      return @$el.showFieldErrors errors: modelErrors if modelErrors

    @$el.showSummaryError
      message: 'An unexpected error has occurred while signing up.'


class Views.Membership extends Backbone.View
    signInViewType: Views.SignIn
    forgotPasswordViewType: Views.ForgotPassword
    signUpViewType: Views.SignUp
    el: '#membership-dialog'
    events:
      'shown a[data-toggle="tab"]': 'onTabHeaderShown'
      'show': 'onDialogShow'
      'shown': 'onDialogShown'
      'hidden': 'onDialogHidden'

    initialize: ->
      @signIn = new @signInViewType()
      @forgotPassword = new @forgotPasswordViewType()
      @signUp = new @signUpViewType()

      @firstTab = @$('a[data-toggle="tab"]').first()

      @$el.modal show: false

      @listenTo App.events, 'showMembership', @onShowMembership
      @listenTo App.events,
        'signedIn passwordResetRequested signedUp',
        @onSignedInOrPasswordResetRequestedOrSignedUp

    onShowMembership: (e) ->
      @ok = e?.ok
      @cancel = e?.cancel
      @firstTab.trigger 'click'
      @$el.modal 'show'

    onSignedInOrPasswordResetRequestedOrSignedUp: ->
      @canceled = false
      @$el.modal 'hide'

    onTabHeaderShown: (e) ->
      return false unless e.target?.hash
      @$(e.target.hash).putFocus()

    onDialogShow: ->
      @canceled = true
      @$el.resetFields()
        .hideSummaryError()
        .hideFieldErrors()

    onDialogShown: -> @$el.putFocus()

    onDialogHidden: ->
      return @cancel?() if @canceled
      @ok?()