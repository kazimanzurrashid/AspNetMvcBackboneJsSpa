(function() {
  var $, App, Views, exports,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  exports = this;

  App = exports.Application || (exports.Application = {});

  Views = App.Views || (App.Views = {});

  $ = jQuery;

  Views.Navigation = (function(_super) {

    __extends(Navigation, _super);

    function Navigation() {
      return Navigation.__super__.constructor.apply(this, arguments);
    }

    Navigation.prototype.el = '#navigation';

    Navigation.prototype.events = {
      'click [data-command]': 'handleCommand'
    };

    Navigation.prototype.select = function(view) {
      return this.deselectAll().filter("." + view).addClass('active');
    };

    Navigation.prototype.deselectAll = function() {
      return this.$('.nav > li').removeClass('active');
    };

    Navigation.prototype.handleCommand = function(e) {
      var command;
      command = $(e.currentTarget).attr('data-command');
      if (!command) {
        return false;
      }
      return App.events.trigger(command);
    };

    return Navigation;

  })(Backbone.View);

}).call(this);
