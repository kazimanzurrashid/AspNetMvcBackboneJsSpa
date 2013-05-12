(function() {
  var App, Models, Views, exports,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  exports = this;

  App = exports.Application || (exports.Application = {});

  Views = App.Views || (App.Views = {});

  Models = App.Models;

  Views.MembershipChildForm = (function(_super) {

    __extends(MembershipChildForm, _super);

    function MembershipChildForm() {
      return MembershipChildForm.__super__.constructor.apply(this, arguments);
    }

    MembershipChildForm.prototype.events = {
      'submit': 'onSubmit'
    };

    MembershipChildForm.prototype.modelType = null;

    MembershipChildForm.prototype.successEvent = null;

    MembershipChildForm.prototype.handleError = function(jqxhr) {
      throw new Error('Not Implemented');
    };

    MembershipChildForm.prototype.onSubmit = function(e) {
      var model,
        _this = this;
      e.preventDefault();
      this.$el.hideSummaryError().hideFieldErrors();
      model = new this.modelType;
      Views.Helpers.subscribeModelInvalidEvent(model, this.$el);
      return model.save(this.$el.serializeFields(), {
        success: function() {
          return App.events.trigger(_this.successEvent);
        },
        error: function(m, jqxhr) {
          return _this.handleError(jqxhr);
        }
      });
    };

    return MembershipChildForm;

  })(Backbone.View);

  Views.SignIn = (function(_super) {

    __extends(SignIn, _super);

    function SignIn() {
      return SignIn.__super__.constructor.apply(this, arguments);
    }

    SignIn.prototype.el = '#sign-in-form';

    SignIn.prototype.modelType = Models.Session;

    SignIn.prototype.successEvent = 'signedIn';

    SignIn.prototype.handleError = function(jqxhr) {
      var message;
      message = Views.Helpers.hasModelErrors(jqxhr) ? 'Invalid credentials.' : 'An unexpected error has occurred while signing in.';
      return this.$el.showSummaryError({
        message: message
      });
    };

    return SignIn;

  })(Views.MembershipChildForm);

  Views.ForgotPassword = (function(_super) {

    __extends(ForgotPassword, _super);

    function ForgotPassword() {
      return ForgotPassword.__super__.constructor.apply(this, arguments);
    }

    ForgotPassword.prototype.el = '#forgot-password-form';

    ForgotPassword.prototype.modelType = Models.ForgotPassword;

    ForgotPassword.prototype.successEvent = 'passwordResetRequested';

    ForgotPassword.prototype.handleError = function() {
      return this.$el.showSummaryError({
        message: 'An unexpected error has occurred while requesting password ' + 'reset.'
      });
    };

    return ForgotPassword;

  })(Views.MembershipChildForm);

  Views.SignUp = (function(_super) {

    __extends(SignUp, _super);

    function SignUp() {
      return SignUp.__super__.constructor.apply(this, arguments);
    }

    SignUp.prototype.el = '#sign-up-form';

    SignUp.prototype.modelType = Models.User;

    SignUp.prototype.successEvent = 'signedUp';

    SignUp.prototype.handleError = function(jqxhr) {
      var modelErrors;
      if (Views.Helpers.hasModelErrors(jqxhr)) {
        modelErrors = Views.Helpers.getModelErrors(jqxhr);
        if (modelErrors) {
          return this.$el.showFieldErrors({
            errors: modelErrors
          });
        }
      }
      return this.$el.showSummaryError({
        message: 'An unexpected error has occurred while signing up.'
      });
    };

    return SignUp;

  })(Views.MembershipChildForm);

  Views.Membership = (function(_super) {

    __extends(Membership, _super);

    function Membership() {
      return Membership.__super__.constructor.apply(this, arguments);
    }

    Membership.prototype.signInViewType = Views.SignIn;

    Membership.prototype.forgotPasswordViewType = Views.ForgotPassword;

    Membership.prototype.signUpViewType = Views.SignUp;

    Membership.prototype.el = '#membership-dialog';

    Membership.prototype.events = {
      'shown a[data-toggle="tab"]': 'onTabHeaderShown',
      'show': 'onDialogShow',
      'shown': 'onDialogShown',
      'hidden': 'onDialogHidden'
    };

    Membership.prototype.initialize = function() {
      this.signIn = new this.signInViewType();
      this.forgotPassword = new this.forgotPasswordViewType();
      this.signUp = new this.signUpViewType();
      this.firstTab = this.$('a[data-toggle="tab"]').first();
      this.$el.modal({
        show: false
      });
      this.listenTo(App.events, 'showMembership', this.onShowMembership);
      return this.listenTo(App.events, 'signedIn passwordResetRequested signedUp', this.onSignedInOrPasswordResetRequestedOrSignedUp);
    };

    Membership.prototype.onShowMembership = function(e) {
      this.ok = e != null ? e.ok : void 0;
      this.cancel = e != null ? e.cancel : void 0;
      this.firstTab.trigger('click');
      return this.$el.modal('show');
    };

    Membership.prototype.onSignedInOrPasswordResetRequestedOrSignedUp = function() {
      this.canceled = false;
      return this.$el.modal('hide');
    };

    Membership.prototype.onTabHeaderShown = function(e) {
      var _ref;
      if (!((_ref = e.target) != null ? _ref.hash : void 0)) {
        return false;
      }
      return this.$(e.target.hash).putFocus();
    };

    Membership.prototype.onDialogShow = function() {
      this.canceled = true;
      return this.$el.resetFields().hideSummaryError().hideFieldErrors();
    };

    Membership.prototype.onDialogShown = function() {
      return this.$el.putFocus();
    };

    Membership.prototype.onDialogHidden = function() {
      if (this.canceled) {
        return typeof this.cancel === "function" ? this.cancel() : void 0;
      }
      return typeof this.ok === "function" ? this.ok() : void 0;
    };

    return Membership;

  })(Backbone.View);

}).call(this);
