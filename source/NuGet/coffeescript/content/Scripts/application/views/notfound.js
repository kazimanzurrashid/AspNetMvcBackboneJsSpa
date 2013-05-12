(function() {
  var App, Views, exports,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  exports = this;

  App = exports.Application || (exports.Application = {});

  Views = App.Views || (App.Views = {});

  Views.NotFound = (function(_super) {

    __extends(NotFound, _super);

    function NotFound() {
      return NotFound.__super__.constructor.apply(this, arguments);
    }

    NotFound.prototype.el = '#not-found-page';

    return NotFound;

  })(Backbone.View);

  _(Views.NotFound.prototype).extend(Views.Activable);

}).call(this);
