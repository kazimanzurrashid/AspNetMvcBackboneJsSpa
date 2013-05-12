exports = @
App = exports.Application or= {}
Views = App.Views or= {}

animationDuration = 400

Views.Activable =
  activate: ->
    @clearAnimationTimer()
    el = @$el
    animate = =>
      el.show()
        .css( marginLeft: el.outerWidth())
        .hide()
        .show =>
          el.animate marginLeft: 0, animationDuration, =>
            @animationTimer = undefined
            @onActivate?()
    @animationTimer = _(animate).defer()

  deactivate: ->
    @onDeactivate?()
    @$el.hide()
    @clearAnimationTimer()

  clearAnimationTimer: ->
    clearTimeout @animationTimer if @animationTimer
    @animationTimer = undefined