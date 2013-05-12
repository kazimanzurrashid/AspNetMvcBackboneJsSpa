(function() {
  var $, App, exports,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  exports = this;

  App = exports.Application || (exports.Application = {});

  $ = jQuery;

  App.Router = (function(_super) {

    __extends(Router, _super);

    function Router() {
      return Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.routes = {
      '!/about': 'about',
      '!/': 'home',
      '*path': 'notFound'
    };

    Router.prototype.about = function() {
      return this.activate(this.aboutView, 'about');
    };

    Router.prototype.home = function() {
      return this.activate(this.homeView, 'home');
    };

    Router.prototype.notFound = function() {
      return this.activate(this.notFoundView);
    };

    Router.prototype.activate = function(view, menu) {
      if (this.currentView) {
        if (this.currentView === view) {
          return false;
        }
        this.currentView.deactivate();
      }
      if (menu) {
        this.navigationView.select(menu);
      } else {
        this.navigationView.deselectAll();
      }
      this.currentView = view;
      return this.currentView.activate();
    };

    Router.prototype.initialize = function() {
      var pageTemplate;
      this.navigationView = new App.Views.Navigation();
      pageTemplate = _($('#page-template').html()).template();
      this.homeView = new App.Views.Page({
        className: 'page',
        template: pageTemplate,
        model: new Backbone.Model({
          title: 'Home',
          content: "<h4>Welcome to Backbone.js SPA</h4>\n<p>\n  Backbone.js SPA is starter kit template to develop single page \n  application with Backbone.js in Microsoft Technology Stack. Some of\n  the key technology used in this template are:\n</p>\n<ol>\n  <li><a href=\"http://backbonejs.org/\">Backbone.js</a></li>\n  <li><a href=\"http://coffeescript.org/\">CoffeeScript</a></li>\n  <li><a href=\"http://twitter.github.com/bootstrap/\">Twitter Bootstrap</a></li>\n  <li><a href=\"http://fortawesome.github.com/Font-Awesome/\">Font Awesome</a></li>\n  <li><a href=\"http://aboutcode.net/postal/\">Postal</a></li>\n  <li><a href=\"http://www.asp.net/web-api\">ASP.NET Web API</a></li>\n  <li><a href=\"http://www.asp.net/mvc\">ASP.NET MVC</a></li>\n  <li>and many more...</li>\n</ol>\n<p>\n  To get the latest update visit the <a href=\"https://github.com/kazimanzurrashid/AspNetMvcBackboneJsSpa\">Project Page</a>\n  or follow me <a href=\"https://twitter.com/manzurrashid\">@manzurrashid</a>.\n</p>"
        })
      });
      this.aboutView = new App.Views.Page({
        className: 'page',
        template: pageTemplate,
        model: new Backbone.Model({
          title: 'About',
          content: 'Tell us about your app.'
        })
      });
      $('#container').prepend(this.homeView.render().$el, this.aboutView.render().$el);
      return this.notFoundView = new App.Views.NotFound();
    };

    return Router;

  })(Backbone.Router);

}).call(this);
