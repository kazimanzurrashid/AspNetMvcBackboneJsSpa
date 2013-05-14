var Application;

(function ($, Backbone, Application) {
    var Views = Application.Views || (Application.Views = {});

    Views.Profile = Backbone.View.extend({
        el: '#profile-dialog',

        events: {
            'shown': 'onDialogShown',
            'submit form': 'onChangePassword',
            'click #sign-out-button': 'onSignOut'
        },
        
        changePasswordModelType: Application.Models.ChangePassword,
        sessionModelType: Application.Models.Session,
        
        initialize: function () {
            this.changePasswordForm = this.$('form');
            this.$el.modal({ show: false });
            this.listenTo(Application.events, 'showProfile', this.onShowProfile);
        },
        
        onShowProfile: function () {
            this.changePasswordForm
                .resetFields()
                .hideSummaryError()
                .hideFieldErrors();
            
            this.$el.modal('show');
        },
        
        onDialogShown: function () {
            this.changePasswordForm.putFocus();
        },
        
        onChangePassword: function (e) {
            e.preventDefault();
            this.changePasswordForm
                .hideSummaryError()
                .hideFieldErrors();
            
            var model = new this.changePasswordModelType();
            Views.Helpers.subscribeModelInvalidEvent(model, this.changePasswordForm);

            var self = this;
            
            model.save(this.changePasswordForm.serializeFields(), {
                success: function() {
                    self.$el.modal('hide');
                    Application.events.trigger('passwordChanged');
                },
                error: function(m, jqxhr) {
                    if (Views.Helpers.hasModelErrors(jqxhr)) {
                        var modelErrors = Views.Helpers.getModelErrors(jqxhr);
                        if (modelErrors) {
                            self.changePasswordForm.showFieldErrors({
                                errors: modelErrors
                            });
                            return;
                        }
                    }
                    self.changePasswordForm.showSummaryError({
                        message: 'An unexpected error has occurred while ' + 'changing your password.'
                    });
                }
            });
        },
        
        onSignOut: function (e) {
            e.preventDefault();
            
            this.$el.modal('hide');

            var self = this;
            
            $.confirm({
                prompt: 'Are you sure you want to sign out?',
                ok: function () {
                    return (new self.sessionModelType({
                        id: Date.now()
                    })).destroy({
                        success: function() {
                            Application.events.trigger('signedOut');
                        }
                    });
                }
            });
        }
    });

})(jQuery, Backbone, Application || (Application = {}));
