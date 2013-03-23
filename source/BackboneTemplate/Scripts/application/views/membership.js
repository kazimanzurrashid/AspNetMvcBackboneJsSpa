var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Application;
(function (Application) {
    (function (Views) {
        var Membership = (function (_super) {
            __extends(Membership, _super);
            function Membership() {
                _super.apply(this, arguments);

            }
            Membership.prototype.initialize = function () {
                var _this = this;
                this.signIn = new SignIn();
                this.forgotPassword = new ForgotPassword();
                this.signUp = new SignUp();
                var tabHeaders = this.$el.find('a[data-toggle="tab"]').on('shown', function (e) {
                    var anchor = e.target;
                    if(anchor && anchor.hash) {
                        _this.$el.find(anchor.hash).putFocus();
                    }
                });
                this.$el.modal({
                    show: false
                }).on('shown', function () {
                    _this.canceled = true;
                    _this.$el.resetFields().hideSummaryError().hideFieldErrors();
                }).on('shown', function () {
                    return _this.$el.putFocus();
                }).on('hidden', function () {
                    if(_this.canceled && _.isFunction(_this.cancel)) {
                        _this.cancel();
                    } else {
                        if(_.isFunction(_this.ok)) {
                            _this.ok();
                        }
                    }
                });
                Application.events.on('showMembership', function (e) {
                    _this.ok = (e && _.isFunction(e.ok)) ? e.ok : void (0);
                    _this.cancel = (e && _.isFunction(e.cancel)) ? e.cancel : void (0);
                    tabHeaders.first().trigger('click');
                    _this.$el.modal('show');
                });
                Application.events.on('signedIn passwordResetRequested signedUp', function () {
                    _this.canceled = false;
                    _this.$el.modal('hide');
                });
            };
            return Membership;
        })(Backbone.View);
        Views.Membership = Membership;        
        Membership.prototype.el = '#membership-dialog';
        function subscribeModelInvalidEvent(model, el) {
            model.on('invalid', function () {
                return el.showFieldErrors({
                    errors: (model).validationError.errors
                });
            });
        }
        var SignIn = (function (_super) {
            __extends(SignIn, _super);
            function SignIn() {
                _super.apply(this, arguments);

            }
            SignIn.prototype.submit = function (e) {
                var _this = this;
                e.preventDefault();
                this.$el.hideSummaryError().hideFieldErrors();
                var model = new Application.Models.Session();
                subscribeModelInvalidEvent(model, this.$el);
                (model).save(this.$el.serializeFields(), {
                    success: function () {
                        return Application.events.trigger('signedIn');
                    },
                    error: function (m, jqxhr) {
                        var message = (jqxhr.status === 400) ? 'Invalid credentials.' : 'An unexpected error has occurred while signing in.';
                        _this.$el.showSummaryError({
                            message: message
                        });
                    }
                });
            };
            return SignIn;
        })(Backbone.View);
        Views.SignIn = SignIn;        
        SignIn.prototype.el = '#sign-in-form';
        SignIn.prototype.events = {
            'submit': 'submit'
        };
        var ForgotPassword = (function (_super) {
            __extends(ForgotPassword, _super);
            function ForgotPassword() {
                _super.apply(this, arguments);

            }
            ForgotPassword.prototype.submit = function (e) {
                var _this = this;
                e.preventDefault();
                this.$el.hideSummaryError().hideFieldErrors();
                var model = new Application.Models.ForgotPassword();
                subscribeModelInvalidEvent(model, this.$el);
                model.save(this.$el.serializeFields(), {
                    success: function () {
                        return Application.events.trigger('passwordResetRequested');
                    },
                    error: function () {
                        return _this.$el.showSummaryError({
                            message: 'An unexpected error has occurred while ' + 'requesting password reset.'
                        });
                    }
                });
            };
            return ForgotPassword;
        })(Backbone.View);
        Views.ForgotPassword = ForgotPassword;        
        ForgotPassword.prototype.el = '#forgot-password-form';
        ForgotPassword.prototype.events = {
            'submit': 'submit'
        };
        var SignUp = (function (_super) {
            __extends(SignUp, _super);
            function SignUp() {
                _super.apply(this, arguments);

            }
            SignUp.prototype.submit = function (e) {
                var _this = this;
                e.preventDefault();
                this.$el.hideSummaryError().hideFieldErrors();
                var model = new Application.Models.User();
                subscribeModelInvalidEvent(model, this.$el);
                (model).save(this.$el.serializeFields(), {
                    success: function () {
                        return Application.events.trigger('signedUp');
                    },
                    error: function (m, jqxhr) {
                        if(jqxhr.status === 400) {
                            var response = $.parseJSON(jqxhr.responseText);
                            if(response && _.has(response, 'ModelState')) {
                                return _this.$el.showFieldErrors({
                                    errors: response.ModelState
                                });
                            }
                        }
                        _this.$el.showSummaryError({
                            message: 'An unexpected error has occurred while ' + 'signing up.'
                        });
                    }
                });
            };
            return SignUp;
        })(Backbone.View);
        Views.SignUp = SignUp;        
        SignUp.prototype.el = '#sign-up-form';
        SignUp.prototype.events = {
            'submit': 'submit'
        };
    })(Application.Views || (Application.Views = {}));
    var Views = Application.Views;
})(Application || (Application = {}));
