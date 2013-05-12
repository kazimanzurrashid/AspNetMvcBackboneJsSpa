(function() {
  var App, Models, Views, exports, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  exports = this;

  App = exports.Application || (exports.Application = {});

  Views = App.Views || (App.Views = {});

  Models = App.Models;

  Views.Profile = (function(_super) {
    __extends(Profile, _super);

    function Profile() {
      _ref = Profile.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Profile.prototype.changePasswordModelType = Models.ChangePassword;

    Profile.prototype.sessionModelType = Models.Session;

    Profile.prototype.el = '#profile-dialog';

    Profile.prototype.events = {
      'shown': 'onDialogShown',
      'submit form': 'onChangePassword',
      'click #sign-out-button': 'onSignOut'
    };

    Profile.prototype.initialize = function() {
      this.changePasswordForm = this.$('form');
      this.$el.modal({
        show: false
      });
      return this.listenTo(App.events, 'showProfile', this.onShowProfile);
    };

    Profile.prototype.onShowProfile = function() {
      this.changePasswordForm.resetFields().hideSummaryError().hideFieldErrors();
      return this.$el.modal('show');
    };

    Profile.prototype.onDialogShown = function() {
      return this.changePasswordForm.putFocus();
    };

    Profile.prototype.onChangePassword = function(e) {
      var model,
        _this = this;

      e.preventDefault();
      this.changePasswordForm.hideSummaryError().hideFieldErrors();
      model = new this.changePasswordModelType;
      Views.Helpers.subscribeModelInvalidEvent(model, this.changePasswordForm);
      return model.save(this.changePasswordForm.serializeFields(), {
        success: function() {
          _this.$el.modal('hide');
          return App.events.trigger('passwordChanged');
        },
        error: function(m, jqxhr) {
          var modelErrors;

          if (Views.Helpers.hasModelErrors(jqxhr)) {
            modelErrors = Views.Helpers.getModelErrors(jqxhr);
            if (modelErrors) {
              return _this.changePasswordForm.showFieldErrors({
                errors: modelErrors
              });
            }
          }
          return _this.changePasswordForm.showSummaryError({
            message: 'An unexpected error has occurred while changing your ' + 'password.'
          });
        }
      });
    };

    Profile.prototype.onSignOut = function(e) {
      var _this = this;

      e.preventDefault();
      this.$el.modal('hide');
      return $.confirm({
        prompt: 'Are you sure you want to sign out?',
        ok: function() {
          return (new _this.sessionModelType({
            id: Date.now()
          })).destroy({
            success: function() {
              return App.events.trigger('signedOut');
            }
          });
        }
      });
    };

    return Profile;

  })(Backbone.View);

}).call(this);
