(function() {
  var App, Models, exports,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  exports = this;

  App = exports.Application || (exports.Application = {});

  Models = App.Models || (App.Models = {});

  Models.User = (function(_super) {

    __extends(User, _super);

    function User() {
      return User.__super__.constructor.apply(this, arguments);
    }

    User.prototype.urlRoot = function() {
      return App.serverUrlPrefix + '/users';
    };

    User.prototype.defaults = function() {
      return {
        email: null,
        password: null,
        confirmPassword: null
      };
    };

    User.prototype.validate = function(attributes) {
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
      if (attributes.password) {
        if (!Validation.isValidPasswordLength(attributes.password)) {
          Validation.addError(errors, 'password', 'Password length must be between 6 to 64 characters.');
        }
      } else {
        Validation.addError(errors, 'password', 'Password is required.');
      }
      if (attributes.confirmPassword) {
        if (attributes.confirmPassword !== attributes.password) {
          Validation.addError(errors, 'confirmPassword', 'Password and confirm password do not match.');
        }
      } else {
        Validation.addError(errors, 'confirmPassword', 'Confirm password is required.');
      }
      if (_(errors).isEmpty()) {
        return void 0;
      } else {
        return errors;
      }
    };

    return User;

  })(Backbone.Model);

}).call(this);
