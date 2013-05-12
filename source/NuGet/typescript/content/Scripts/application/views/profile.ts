/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/bootstrap/bootstrap.d.ts" />
/// <reference path="../../typings/underscore/underscore-typed.d.ts" />
/// <reference path="../../typings/backbone/backbone.d.ts" />

/// <reference path="../events.ts" />
/// <reference path="../lib/form.ts" />
/// <reference path="../lib/confirm.ts" />
/// <reference path="../models/changepassword.ts" />
/// <reference path="../models/session.ts" />
/// <reference path="helpers.ts" />

module Application.Views {
    export class Profile extends Backbone.View {
        changePasswordModelType: any;
        sessionModelType: any;

        changePasswordForm: JQuery;

        initialize() {
            this.changePasswordForm = this.$('form');
            this.$el.modal({ show: false });
            this.listenTo(events, 'showProfile', this.onShowProfile);
        }

        onShowProfile() {
            this.changePasswordForm
                .resetFields()
                .hideSummaryError()
                .hideFieldErrors();
            this.$el.modal('show');
        }

        onDialogShown() {
            this.changePasswordForm.putFocus();
        }

        onChangePassword(e: JQueryEventObject) {
            e.preventDefault();
            this.changePasswordForm
                .hideSummaryError()
                .hideFieldErrors();

            var model = new this.changePasswordModelType;

            Helpers.subscribeModelInvalidEvent(model, this.changePasswordForm);

            model.save(this.changePasswordForm.serializeFields(), {
                success: () => {
                    this.$el.modal('hide');
                    events.trigger('passwordChanged');
                },
                error: (m?, jqxhr?: JQueryXHR) {
                    if (Helpers.hasModelErrors(jqxhr)) {
                        var modelErrors = Helpers.getModelErrors(jqxhr);
                        if (modelErrors) {
                            return this.changePasswordForm.showFieldErrors({
                                errors: modelErrors
                            });
                        }
                    }
                    this.changePasswordForm.showSummaryError({
                        message: 'An unexpected error has occurred while ' +
                            'changing your password.'
                    });
                }
            });
        }

        onSignOut(e: JQueryEventObject) {
            e.preventDefault();
            this.$el.modal('hide');

            $.confirm({
                prompt: 'Are you sure you want to sign out?',
                ok: () =>
                    (new this.sessionModelType({ id: Date.now() })).destroy({
                        success: () => events.trigger('signedOut')
                    })
            });
        }
    }

    Profile.prototype.changePasswordModelType = Models.ChangePassword;
    Profile.prototype.sessionModelType = Models.Session;
    Profile.prototype.el = '#profile-dialog';
    Profile.prototype.events = {
        'shown': 'onDialogShown',
        'submit form': 'onChangePassword',
        'click #sign-out-button': 'onSignOut'
    }
}