/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/bootstrap/bootstrap.d.ts" />
/// <reference path="../../typings/underscore/underscore.d.ts" />
/// <reference path="../../typings/backbone/backbone.d.ts" />

/// <reference path="../events.ts" />
/// <reference path="../lib/form.ts" />
/// <reference path="../lib/confirm.ts" />
/// <reference path="../models/changepassword.ts" />
/// <reference path="../models/session.ts" />

module Application.Views {
    export class Profile extends Backbone.View {
        $el: JQuery;
        changePasswordForm: JQuery;

        initialize() {
            this.changePasswordForm = this.$('form');

            this.$el.modal({ show: false })
                .on('shown', () => this.changePasswordForm.putFocus());

            events.on('showProfile', () => {
                this.changePasswordForm
                    .resetFields()
                    .hideSummaryError()
                    .hideFieldErrors();
                this.$el.modal('show');
            });
        }

        changePassword(e: JQueryEventObject) {
            e.preventDefault();
            this.changePasswordForm
                .hideSummaryError()
                .hideFieldErrors();

            var model = new Models.ChangePassword;

            model.on('invalid', () =>
                this.changePasswordForm.showFieldErrors({
                    errors: (<any>model).validationError.errors
                })
            );

            (<any>model).save(this.changePasswordForm.serializeFields(), {
                success: () => {
                    this.$el.modal('hide');
                    events.trigger('passwordChanged');
                },
                error: (m, jqxhr: JQueryXHR) {
                    if (jqxhr.status === 400) {
                        var response = <any>$.parseJSON(jqxhr.responseText);
                        if (response && _.has(response, 'ModelState')) {
                            return this.changePasswordForm.showFieldErrors({
                                errors: response.ModelState
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

        signOut(e: JQueryEventObject) {
            e.preventDefault();
            this.$el.modal('hide');

            $.confirm({
                prompt: 'Are you sure you want to sign out?',
                ok: () =>
                    (new Models.Session({ id: Date.now() })).destroy({
                        success: () => events.trigger('signedOut')
                    })
            });
        }
    }

    Profile.prototype.el = <HTMLElement><any>'#profile-dialog';
    Profile.prototype.events = {
       'submit form': 'changePassword',
       'click #sign-out-button': 'signOut'
    }
}