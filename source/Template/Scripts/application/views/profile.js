var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Application;
(function (Application) {
    (function (Views) {
        var Profile = (function (_super) {
            __extends(Profile, _super);
            function Profile() {
                _super.apply(this, arguments);

            }
            Profile.prototype.initialize = function () {
                this.changePasswordForm = this.$('form');
                this.$el.modal({
                    show: false
                });
                this.listenTo(Application.events, 'showProfile', this.onShowProfile);
            };
            Profile.prototype.onShowProfile = function () {
                this.changePasswordForm.resetFields().hideSummaryError().hideFieldErrors();
                this.$el.modal('show');
            };
            Profile.prototype.onDialogShown = function () {
                this.changePasswordForm.putFocus();
            };
            Profile.prototype.onChangePassword = function (e) {
                var _this = this;
                e.preventDefault();
                this.changePasswordForm.hideSummaryError().hideFieldErrors();
                var model = new this.changePasswordModelType();
                Views.Helpers.subscribeModelInvalidEvent(model, this.changePasswordForm);
                model.save(this.changePasswordForm.serializeFields(), {
                    success: function () {
                        _this.$el.modal('hide');
                        Application.events.trigger('passwordChanged');
                    },
                    error: function (m, jqxhr) {
                        if(Views.Helpers.hasModelErrors(jqxhr)) {
                            var modelErrors = Views.Helpers.getModelErrors(jqxhr);
                            if(modelErrors) {
                                return _this.changePasswordForm.showFieldErrors({
                                    errors: modelErrors
                                });
                            }
                        }
                        _this.changePasswordForm.showSummaryError({
                            message: 'An unexpected error has occurred while ' + 'changing your password.'
                        });
                    }
                });
            };
            Profile.prototype.onSignOut = function (e) {
                var _this = this;
                e.preventDefault();
                this.$el.modal('hide');
                $.confirm({
                    prompt: 'Are you sure you want to sign out?',
                    ok: function () {
                        return (new _this.sessionModelType({
                            id: Date.now()
                        })).destroy({
                            success: function () {
                                return Application.events.trigger('signedOut');
                            }
                        });
                    }
                });
            };
            return Profile;
        })(Backbone.View);
        Views.Profile = Profile;        
        Profile.prototype.changePasswordModelType = Application.Models.ChangePassword;
        Profile.prototype.sessionModelType = Application.Models.Session;
        Profile.prototype.el = '#profile-dialog';
        Profile.prototype.events = {
            'shown': 'onDialogShown',
            'submit form': 'onChangePassword',
            'click #sign-out-button': 'onSignOut'
        };
    })(Application.Views || (Application.Views = {}));
    var Views = Application.Views;
})(Application || (Application = {}));
