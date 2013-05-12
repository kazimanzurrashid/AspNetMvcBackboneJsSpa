var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Application;
(function (Application) {
    (function (Views) {
        var MembershipChildForm = (function (_super) {
            __extends(MembershipChildForm, _super);
            function MembershipChildForm() {
                _super.apply(this, arguments);

            }
            MembershipChildForm.prototype.handleError = function (jqxhr) {
                throw new Error('Not Implemented.');
            };
            MembershipChildForm.prototype.onSubmit = function (e) {
                var _this = this;
                e.preventDefault();
                this.$el.hideSummaryError().hideFieldErrors();
                var model = new this.modelType();
                Views.Helpers.subscribeModelInvalidEvent(model, this.$el);
                model.save(this.$el.serializeFields(), {
                    success: function () {
                        return Application.events.trigger(_this.successEvent);
                    },
                    error: function (m, jqxhr) {
                        return _this.handleError(jqxhr);
                    }
                });
            };
            return MembershipChildForm;
        })(Backbone.View);
        Views.MembershipChildForm = MembershipChildForm;        
        MembershipChildForm.prototype.events = {
            'submit': 'onSubmit'
        };
        var SignIn = (function (_super) {
            __extends(SignIn, _super);
            function SignIn() {
                _super.apply(this, arguments);

            }
            SignIn.prototype.handleError = function (jqxhr) {
                var message = Views.Helpers.hasModelErrors(jqxhr) ? 'Invalid credentials.' : 'An unexpected error has occurred while signing in.';
                this.$el.showSummaryError({
                    message: message
                });
            };
            return SignIn;
        })(MembershipChildForm);
        Views.SignIn = SignIn;        
        SignIn.prototype.el = '#sign-in-form';
        SignIn.prototype.modelType = Application.Models.Session;
        SignIn.prototype.successEvent = 'signedIn';
        var ForgotPassword = (function (_super) {
            __extends(ForgotPassword, _super);
            function ForgotPassword() {
                _super.apply(this, arguments);

            }
            ForgotPassword.prototype.handleError = function () {
                this.$el.showSummaryError({
                    message: 'An unexpected error has occurred while ' + 'requesting password reset.'
                });
            };
            return ForgotPassword;
        })(MembershipChildForm);
        Views.ForgotPassword = ForgotPassword;        
        ForgotPassword.prototype.el = '#forgot-password-form';
        ForgotPassword.prototype.modelType = Application.Models.ForgotPassword;
        ForgotPassword.prototype.successEvent = 'passwordResetRequested';
        var SignUp = (function (_super) {
            __extends(SignUp, _super);
            function SignUp() {
                _super.apply(this, arguments);

            }
            SignUp.prototype.handleError = function (jqxhr) {
                if(Views.Helpers.hasModelErrors(jqxhr)) {
                    var modelErrors = Views.Helpers.getModelErrors(jqxhr);
                    if(modelErrors) {
                        return this.$el.showFieldErrors({
                            errors: modelErrors
                        });
                    }
                }
                this.$el.showSummaryError({
                    message: 'An unexpected error has occurred while ' + 'signing up.'
                });
            };
            return SignUp;
        })(MembershipChildForm);
        Views.SignUp = SignUp;        
        SignUp.prototype.el = '#sign-up-form';
        SignUp.prototype.modelType = Application.Models.User;
        SignUp.prototype.successEvent = 'signedUp';
        var Membership = (function (_super) {
            __extends(Membership, _super);
            function Membership() {
                _super.apply(this, arguments);

            }
            Membership.prototype.initialize = function () {
                this.signIn = new this.signInViewType();
                this.forgotPassword = new this.forgotPasswordViewType();
                this.signUp = new this.signUpViewType();
                this.firstTab = this.$('a[data-toggle="tab"]').first();
                this.$el.modal({
                    show: false
                });
                this.listenTo(Application.events, 'showMembership', this.onShowMembership);
                this.listenTo(Application.events, 'signedIn passwordResetRequested signedUp', this.onSignedInOrPasswordResetRequestedOrSignedUp);
            };
            Membership.prototype.onShowMembership = function (e) {
                this.ok = (e && e.ok && _.isFunction(e.ok)) ? e.ok : void (0);
                this.cancel = (e && e.cancel && _.isFunction(e.cancel)) ? e.cancel : void (0);
                this.firstTab.trigger('click');
                this.$el.modal('show');
            };
            Membership.prototype.onSignedInOrPasswordResetRequestedOrSignedUp = function () {
                this.canceled = false;
                this.$el.modal('hide');
            };
            Membership.prototype.onTabHeaderShown = function (e) {
                var anchor = e.target;
                if(anchor && anchor.hash) {
                    this.$(anchor.hash).putFocus();
                }
            };
            Membership.prototype.onDialogShow = function () {
                this.canceled = true;
                this.$el.resetFields().hideSummaryError().hideFieldErrors();
            };
            Membership.prototype.onDialogShown = function () {
                this.$el.putFocus();
            };
            Membership.prototype.onDialogHidden = function () {
                if(this.canceled && this.cancel) {
                    this.cancel();
                } else {
                    if(this.ok) {
                        this.ok();
                    }
                }
            };
            return Membership;
        })(Backbone.View);
        Views.Membership = Membership;        
        Membership.prototype.signInViewType = SignIn;
        Membership.prototype.forgotPasswordViewType = ForgotPassword;
        Membership.prototype.signUpViewType = SignUp;
        Membership.prototype.el = '#membership-dialog';
        Membership.prototype.events = {
            'shown a[data-toggle="tab"]': 'onTabHeaderShown',
            'show': 'onDialogShow',
            'shown': 'onDialogShown',
            'hidden': 'onDialogHidden'
        };
    })(Application.Views || (Application.Views = {}));
    var Views = Application.Views;
})(Application || (Application = {}));
