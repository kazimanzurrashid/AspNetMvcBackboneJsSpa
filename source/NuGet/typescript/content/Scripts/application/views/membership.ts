/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/bootstrap/bootstrap.d.ts" />
/// <reference path="../../typings/underscore/underscore-typed.d.ts" />
/// <reference path="../../typings/backbone/backbone.d.ts" />

/// <reference path="../events.ts" />
/// <reference path="../lib/form.ts" />
/// <reference path="../models/session.ts" />
/// <reference path="../models/forgotpassword.ts" />
/// <reference path="../models/user.ts" />
/// <reference path="helpers.ts" />

module Application.Views {
    export class MembershipChildForm extends Backbone.View {
        modelType: any;
        successEvent: string;

        handleError(jqxhr: JQueryXHR) {
            throw new Error('Not Implemented.');
        }

        onSubmit(e: JQueryEventObject) {
            e.preventDefault();
            this.$el.hideSummaryError().hideFieldErrors();

            var model = new this.modelType;
            Helpers.subscribeModelInvalidEvent(model, this.$el);

            model.save(this.$el.serializeFields(), {
                success: () => events.trigger(this.successEvent),
                error: (m, jqxhr: JQueryXHR) => this.handleError(jqxhr)
            });
        }
    }

    MembershipChildForm.prototype.events = { 'submit': 'onSubmit' };

    export class SignIn extends MembershipChildForm {
        handleError(jqxhr: JQueryXHR) {
            var message = Helpers.hasModelErrors(jqxhr) ?
                'Invalid credentials.' :
                'An unexpected error has occurred while signing in.';
            this.$el.showSummaryError({
                message: message
            });
        }
    }

    SignIn.prototype.el = '#sign-in-form';
    SignIn.prototype.modelType = Models.Session;
    SignIn.prototype.successEvent = 'signedIn';

    export class ForgotPassword extends MembershipChildForm {
        handleError() {
            this.$el.showSummaryError({
                message: 'An unexpected error has occurred while ' +
                'requesting password reset.'
            });
        }
    }

    ForgotPassword.prototype.el = '#forgot-password-form';
    ForgotPassword.prototype.modelType = Models.ForgotPassword;
    ForgotPassword.prototype.successEvent = 'passwordResetRequested';

    export class SignUp extends MembershipChildForm {
        handleError(jqxhr: JQueryXHR) {
            if (Helpers.hasModelErrors(jqxhr)) {
                var modelErrors = Helpers.getModelErrors(jqxhr);
                if (modelErrors) {
                    return this.$el.showFieldErrors({
                        errors: modelErrors
                    });
                }
            }
            this.$el.showSummaryError({
                message: 'An unexpected error has occurred while ' +
                    'signing up.'
            });
        }
    }

    SignUp.prototype.el = '#sign-up-form';
    SignUp.prototype.modelType = Models.User;
    SignUp.prototype.successEvent = 'signedUp';

    export class Membership extends Backbone.View {
        signInViewType: any;
        forgotPasswordViewType: any;
        signUpViewType: any;

        signIn: SignIn;
        forgotPassword: ForgotPassword;
        signUp: SignUp;
        firstTab: JQuery;
        ok: () => void;
        cancel: () => void;
        canceled: bool;

        initialize() {
            this.signIn = new this.signInViewType;
            this.forgotPassword = new this.forgotPasswordViewType;
            this.signUp = new this.signUpViewType;

            this.firstTab = this.$('a[data-toggle="tab"]').first();

            this.$el.modal({ show: false });

            this.listenTo(events, 'showMembership', this.onShowMembership);

            this.listenTo(
                events,
                'signedIn passwordResetRequested signedUp',
                this.onSignedInOrPasswordResetRequestedOrSignedUp);
        }

        onShowMembership(e: IRequiresSignInEventArgs) {
            this.ok = (e && e.ok && _.isFunction(e.ok)) ?
                e.ok :
                void(0);
            this.cancel = (e && e.cancel && _.isFunction(e.cancel)) ?
                e.cancel :
                void(0);
            this.firstTab.trigger('click');
            this.$el.modal('show');
        }

        onSignedInOrPasswordResetRequestedOrSignedUp() {
            this.canceled = false;
            this.$el.modal('hide');
        }

        onTabHeaderShown(e: JQueryEventObject) {
            var anchor = <HTMLAnchorElement>e.target;
            if (anchor && anchor.hash) {
                this.$(anchor.hash).putFocus();
            }
        }

        onDialogShow() {
            this.canceled = true;
            this.$el.resetFields()
                .hideSummaryError()
                .hideFieldErrors();
        }

        onDialogShown() {
            this.$el.putFocus();
        }

        onDialogHidden() {
            if (this.canceled && this.cancel) {
                this.cancel();
            }
            else if (this.ok) {
                this.ok();
            }
        }
    }

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
}