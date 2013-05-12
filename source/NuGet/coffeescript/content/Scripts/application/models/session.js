(function() {
  var App, Models, exports,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  exports = this;

  App = exports.Application || (exports.Application = {});

  Models = App.Models || (App.Models = {});

  Models.Session = (function(_super) {

    __extends(Session, _super);

    function Session() {
      return Session.__super__.constructor.apply(this, arguments);
    }

    Session.prototype.urlRoot = function() {
      return App.serverUrlPrefix + '/sessions';
    };

    Session.prototype.defaults = function() {
      return {
        email: null,
        password: null,
        rememberMe: false
      };
    };

    Session.prototype.validate = function(attributes) {
      var Validation, errors;
      Validation = Models.Validation;
      errors = {};
      if (!attributes.email) {
        Validation.addError(errors, 'email', 'Email is required.');
      }
      if (!attributes.password) {
        Validation.addError(errors, 'password', 'Password is required.');
      }
      if (_(errors).isEmpty()) {
        return void 0;
      } else {
        return errors;
      }
    };

    return Session;

  })(Backbone.Model);

}).call(this);
