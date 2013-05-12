exports = @
App = exports.Application or= {}

$ = jQuery

hasClientUrl = ->
  hash = window.location.hash 
  return true if hash.length > App.clientUrlPrefix.length
  return false if App.clientUrlPrefix.indexOf hash is 0
  true

redirectToDefault = -> App.router.navigate App.clientUrl('/'), true

showInfobar = (message) -> _(-> $.showInfobar message).delay 400

attachEventHandlers = ->
  events = App.events
  events.on 'myAccount', ->
    eventName = if App.userSignnedIn then 'showProfile' else 'showMembership'
    events.trigger eventName

  events.on 'signedIn', ->
    App.userSignnedIn = true
    showInfobar 'You are now signed in.'

  events.on 'passwordResetRequested', ->
    message = 'An email with a password reset link has been sent to your ' +
      'email address. Please open the link to reset your password.'
    showInfobar message

  events.on 'signedUp', ->
    message = 'Thank you for signing up, an email with a confirmation link ' +
      'has been sent to your email address. Please open the link to ' +
      'activate your account.'
    showInfobar message

  events.on 'passwordChanged', ->
    showInfobar 'You have changed your password successfully.'

  events.on 'signedOut', ->
    App.userSignnedIn = false
    showInfobar 'You are now signed out.'

createViews = ->
  App.membershipView = new App.Views.Membership()
  App.profileView = new App.Views.Profile()

App.clientUrl = (segments...) ->
  path = segments.join '/'
  path = path.substring(1) if path.length and path.indexOf('/') is 0
  App.clientUrlPrefix + path

App.start = (options) ->
  App.userSignnedIn = options && options.userSignnedIn
  createViews()
  attachEventHandlers()
  App.router = new App.Router()
  Backbone.history.start()
  return true if hasClientUrl()
  redirectToDefault()