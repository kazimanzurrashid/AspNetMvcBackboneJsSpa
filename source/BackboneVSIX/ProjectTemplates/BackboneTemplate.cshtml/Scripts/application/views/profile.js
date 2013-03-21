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
                var _this = this;
                this.changePasswordForm = this.$('form');
                this.$el.modal({
                    show: false
                }).on('shown', function () {
                    return _this.changePasswordForm.putFocus();
                });
                Application.events.on('showProfile', function () {
                    _this.changePasswordForm.resetFields().hideSummaryError().hideFieldErrors();
                    _this.$el.modal('show');
                });
            };
            Profile.prototype.changePassword = function (e) {
                var _this = this;
                e.preventDefault();
                this.changePasswordForm.hideSummaryError().hideFieldErrors();
                var model = new Application.Models.ChangePassword();
                var invalidHandler = function () {
                    _this.changePasswordForm.showFieldErrors({
                        errors: (model).validationError.errors
                    });
                };
                model.on('invalid', invalidHandler);
                (model).save(this.changePasswordForm.serializeFields(), {
                    success: function () {
                        _this.$el.modal('hide');
                        Application.events.trigger('passwordChanged');
                    },
                    error: function (m, jqxhr) {
                        if(jqxhr.status === 400) {
                            var response = $.parseJSON(jqxhr.responseText);
                            if(response && _.has(response, 'ModelState')) {
                                return _this.changePasswordForm.showFieldErrors({
                                    errors: response.ModelState
                                });
                            }
                        }
                        _this.changePasswordForm.showSummaryError({
                            message: 'An unexpected error has occurred while ' + 'changing your password.'
                        });
                    }
                });
            };
            Profile.prototype.signOut = function (e) {
                e.preventDefault();
                this.$el.modal('hide');
                $.confirm({
                    prompt: 'Are you sure you want to sign out?',
                    ok: function () {
                        (new Application.Models.Session({
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
        Profile.prototype.el = '#profile-dialog';
        Profile.prototype.events = {
            'submit form': 'changePassword',
            'click #sign-out-button': 'signOut'
        };
    })(Application.Views || (Application.Views = {}));
    var Views = Application.Views;
})(Application || (Application = {}));
