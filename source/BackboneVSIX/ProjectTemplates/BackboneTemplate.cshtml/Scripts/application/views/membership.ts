/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/bootstrap/bootstrap.d.ts" />
/// <reference path="../../typings/underscore/underscore.d.ts" />
/// <reference path="../../typings/backbone/backbone.d.ts" />

/// <reference path="../events.ts" />
/// <reference path="../lib/form.ts" />
/// <reference path="../models/session.ts" />
/// <reference path="../models/forgotpassword.ts" />
/// <reference path="../models/user.ts" />

module Application.Views {
    export class Membership extends Backbone.View {
        $el: JQuery;
        signIn: SignIn;
        forgotPassword: ForgotPassword;
        signUp: SignUp;
        ok: () => void;
        cancel: () => void;
        canceled: bool;

        initialize() {
            this.signIn = new SignIn;
            this.forgotPassword = new ForgotPassword;
            this.signUp = new SignUp;

            var tabHeaders = this.$el.find('a[data-toggle="tab"]')
                .on('shown', (e: JQueryEventObject) => {
                    var anchor = <HTMLAnchorElement>e.target;
                    if (anchor && anchor.hash) {
                        this.$el.find(anchor.hash).putFocus();
                    }
                });

            this.$el.modal({ show: false })
                .on('shown', () => {
                    this.canceled = true;
                    this.$el.resetFields()
                        .hideSummaryError()
                        .hideFieldErrors();
                })
                .on('shown', () => this.$el.putFocus())
                .on('hidden', () => {
                    if (this.canceled && _.isFunction(this.cancel)) {
                        this.cancel();
                    }
                    else if (_.isFunction(this.ok)) {
                        this.ok();
                    }
                });

            events.on('showMembership', (e: IRequiresSignInEventArgs) => {
                this.ok = (e && _.isFunction(e.ok)) ? e.ok : void(0);
                this.cancel = (e && _.isFunction(e.cancel)) ? e.cancel : void(0);
                tabHeaders.first().trigger('click');
                this.$el.modal('show');
            });

            events.on('signedIn passwordResetRequested signedUp', () => {
                this.canceled = false;
                this.$el.modal('hide');
            });
        }
    }

    Membership.prototype.el = <HTMLElement><any>'#membership-dialog';

    function subscribeModelInvalidEvent(model: Backbone.Model, el: JQuery) {
        model.on('invalid', () =>
            el.showFieldErrors({
                errors: (<any>model).validationError.errors
            })
        );
    }

    export class SignIn extends Backbone.View {
        $el: JQuery;

        submit(e: JQueryEventObject) {
            e.preventDefault();
            this.$el.hideSummaryError().hideFieldErrors();

            var model = new Models.Session;
            subscribeModelInvalidEvent(model, this.$el);

            (<any>model).save(this.$el.serializeFields(), {
                success: () => events.trigger('signedIn'),
                error: (m, jqxhr: JQueryXHR) => {
                    var message = (jqxhr.status === 400) ?
                        'Invalid credentials.' :
                        'An unexpected error has occurred while signing in.';
                    this.$el.showSummaryError({
                        message: message
                    });
                }
            });
        }
    }

    SignIn.prototype.el = <HTMLElement><any>'#sign-in-form';
    SignIn.prototype.events = {
        'submit': 'submit'
    };
    
    export class ForgotPassword extends Backbone.View {
        $el: JQuery;

        submit(e: JQueryEventObject) {
            e.preventDefault();
            this.$el.hideSummaryError().hideFieldErrors();

            var model = new Models.ForgotPassword;
            subscribeModelInvalidEvent(model, this.$el);

            model.save(this.$el.serializeFields(), {
                success: () => events.trigger('passwordResetRequested'),
                error: () => this.$el.showSummaryError({
                    message: 'An unexpected error has occurred while ' +
                    'requesting password reset.'
                })
            });
        }
    }

    ForgotPassword.prototype.el = <HTMLElement><any>'#forgot-password-form';
    ForgotPassword.prototype.events = {
        'submit': 'submit'
    };

    export class SignUp extends Backbone.View {
        $el: JQuery;

        submit(e: JQueryEventObject) {
            e.preventDefault();
            this.$el.hideSummaryError().hideFieldErrors();

            var model = new Models.User;
            subscribeModelInvalidEvent(model, this.$el);

            (<any>model).save(this.$el.serializeFields(), {
                success: () => events.trigger('signedUp'),
                error: (m, jqxhr: JQueryXHR) => {
                    if (jqxhr.status === 400) {
                        var response = <any>$.parseJSON(jqxhr.responseText);
                        if (response && _.has(response, 'ModelState')) {
                            return this.$el.showFieldErrors({
                                errors: response.ModelState
                            });
                        }
                    }
                    this.$el.showSummaryError({
                        message: 'An unexpected error has occurred while ' +
                            'signing up.'
                    });
                }
            });
        }
    }

    SignUp.prototype.el = <HTMLElement><any>'#sign-up-form';
    SignUp.prototype.events = {
        'submit': 'submit'
    };
}