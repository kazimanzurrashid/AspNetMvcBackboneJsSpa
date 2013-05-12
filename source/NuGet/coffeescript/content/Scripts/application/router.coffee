exports = @
App = exports.Application or= {}

$ = jQuery

class App.Router extends Backbone.Router
  routes:
    '!/about': 'about',
    '!/': 'home',
    '*path': 'notFound'

  about: -> @activate @aboutView, 'about'

  home: -> @activate @homeView, 'home'

  notFound: -> @activate @notFoundView
    
  activate: (view, menu)->
    if @currentView
      return false if @currentView is view
      @currentView.deactivate()

    if menu
      @navigationView.select menu
    else
      @navigationView.deselectAll()

    @currentView = view
    @currentView.activate()

  initialize: ->
    @navigationView = new App.Views.Navigation()
    pageTemplate = _($('#page-template').html()).template()

    @homeView = new App.Views.Page
      className: 'page'
      template: pageTemplate
      model: new Backbone.Model
        title: 'Home'
        content: """
          <h4>Welcome to Backbone.js SPA</h4>
          <p>
            Backbone.js SPA is starter kit template to develop single page 
            application with Backbone.js in Microsoft Technology Stack. Some of
            the key technology used in this template are:
          </p>
          <ol>
            <li><a href="http://backbonejs.org/">Backbone.js</a></li>
            <li><a href="http://coffeescript.org/">CoffeeScript</a></li>
            <li><a href="http://twitter.github.com/bootstrap/">Twitter Bootstrap</a></li>
            <li><a href="http://fortawesome.github.com/Font-Awesome/">Font Awesome</a></li>
            <li><a href="http://aboutcode.net/postal/">Postal</a></li>
            <li><a href="http://www.asp.net/web-api">ASP.NET Web API</a></li>
            <li><a href="http://www.asp.net/mvc">ASP.NET MVC</a></li>
            <li>and many more...</li>
          </ol>
          <p>
            To get the latest update visit the <a href="https://github.com/kazimanzurrashid/AspNetMvcBackboneJsSpa">Project Page</a>
            or follow me <a href="https://twitter.com/manzurrashid">@manzurrashid</a>.
          </p>"""

    @aboutView = new App.Views.Page
      className: 'page'
      template: pageTemplate
      model: new Backbone.Model
        title: 'About'
        content: 'Tell us about your app.'

    $('#container').prepend @homeView.render().$el, @aboutView.render().$el

    @notFoundView = new App.Views.NotFound()