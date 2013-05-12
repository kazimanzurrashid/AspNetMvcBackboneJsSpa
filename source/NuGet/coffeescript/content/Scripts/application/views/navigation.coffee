exports = @
App = exports.Application or= {}
Views = App.Views or= {}

$ = jQuery

class Views.Navigation extends Backbone.View
  el: '#navigation'
  events: { 'click [data-command]': 'handleCommand' }
 
  select: (view) ->
    @deselectAll().filter(".#{view}").addClass 'active'

  deselectAll: -> @$('.nav > li').removeClass 'active'

  handleCommand: (e) ->
    command = $(e.currentTarget).attr 'data-command'
    return false unless command
    App.events.trigger command