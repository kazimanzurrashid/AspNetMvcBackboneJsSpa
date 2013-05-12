(function() {
  var App, Models, exports,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  exports = this;

  App = exports.Application || (exports.Application = {});

  Models = App.Models || (App.Models = {});

  Models.ForgotPassword = (function(_super) {

    __extends(ForgotPassword, _super);

    function ForgotPassword() {
      return ForgotPassword.__super__.constructor.apply(this, arguments);
    }

    ForgotPassword.prototype.urlRoot = function() {
      return App.serverUrlPrefix + '/password/forgot';
    };

    ForgotPassword.prototype.defaults = function() {
      return {
        email: null
      };
    };

    ForgotPassword.prototype.validate = function(attributes) {
      var Validation, errors;
      Validation = Models.Validation;
      errors = {};
      if (attributes.email) {
        if (!Validation.isValidEmailFormat(attributes.email)) {
          Validation.addError(errors, 'email', 'Invalid email address format.');
        }
      } else {
        Validation.addError(errors, 'email', 'Email is required.');
      }
      if (_(errors).isEmpty()) {
        return void 0;
      } else {
        return errors;
      }
    };

    return ForgotPassword;

  })(Backbone.Model);

}).call(this);
