var Application;

(function (Backbone, Application) {
    var Views = Application.Views || (Application.Views = {});

    Views.MembershipChildForm = Backbone.View.extend({
        events: {
            'submit': 'onSubmit'
        },
        
        handleError: function(jqxhr) {
            throw new Error('Not Implemented');
        },
        
        onSubmit: function(e) {
            e.preventDefault();

            this.$el.hideSummaryError()
                .hideFieldErrors();

            var model = new this.modelType();
            
            Views.Helpers.subscribeModelInvalidEvent(model, this.$el);
            var self = this;
            
            model.save(this.$el.serializeFields(), {
                success: function () {
                    return Application.events.trigger(self.successEvent);
                },
                error: function (m, jqxhr) {
                    return self.handleError(jqxhr);
                }
            });
        }
    });

    Views.SignIn = Views.MembershipChildForm.extend({
        el: '#sign-in-form',
        modelType: Application.Models.Session,
        successEvent: 'signedIn',
        
        handleError: function (jqxhr) {
            var message = Views.Helpers.hasModelErrors(jqxhr) ?
                'Invalid credentials.' :
                'An unexpected error has occurred while signing in.';

            this.$el.showSummaryError({
                message: message
            });
        }
    });
    
    Views.ForgotPassword = Views.MembershipChildForm.extend({
        el: '#forgot-password-form',
        modelType: Application.Models.ForgotPassword,
        successEvent: 'passwordResetRequested',

        handleError: function () {
            this.$el.showSummaryError({
                message: 'An unexpected error has occurred while ' +
                'requesting password reset.'
            });
        }
    });
    
    Views.SignUp = Views.MembershipChildForm.extend({
        el: '#sign-up-form',
        modelType: Application.Models.User,
        successEvent: 'signedUp',

        handleError: function (jqxhr) {
            if (Views.Helpers.hasModelErrors(jqxhr)) {
                var modelErrors = Views.Helpers.getModelErrors(jqxhr);
                if (modelErrors) {
                    this.$el.showFieldErrors({
                        errors: modelErrors
                    });
                    return;
                }
            }
            
            this.$el.showSummaryError({
                message: 'An unexpected error has occurred while ' +
                    'signing up.'
            });
        }
    });

    Views.Membership = Backbone.View.extend({
        el: '#membership-dialog',
        events: {
            'shown a[data-toggle="tab"]': 'onTabHeaderShown',
            'show': 'onDialogShow',
            'shown': 'onDialogShown',
            'hidden': 'onDialogHidden'
        },
        
        signInViewType: Views.SignIn,
        forgotPasswordViewType: Views.ForgotPassword,
        signUpViewType: Views.SignUp,
        
        initialize: function() {
            this.signIn = new this.signInViewType();
            this.forgotPassword = new this.forgotPasswordViewType();
            this.signUp = new this.signUpViewType();
            
            this.firstTab = this.$('a[data-toggle="tab"]').first();
            
            this.$el.modal({ show: false });

            this.listenTo(
                Application.events,
                'showMembership',
                this.onShowMembership);
            
            this.listenTo(
                Application.events,
                'signedIn passwordResetRequested signedUp',
                this.onSignedInOrPasswordResetRequestedOrSignedUp);
        },
        
        onShowMembership: function(e) {
            this.ok = (e && e.ok && _.isFunction(e.ok)) ? e.ok : void (0);
            this.cancel = (e && e.cancel && _.isFunction(e.cancel)) ? e.cancel : void (0);
            this.firstTab.trigger('click');
            this.$el.modal('show');
        },
        
        onSignedInOrPasswordResetRequestedOrSignedUp: function() {
            this.canceled = false;
            this.$el.modal('hide');
        },
        
        onTabHeaderShown: function(e) {
            var anchor = e.target;
            if (anchor && anchor.hash) {
                this.$(anchor.hash).putFocus();
            }
        },
        
        onDialogShow: function() {
            this.canceled = true;
            this.$el.resetFields()
                .hideSummaryError()
                .hideFieldErrors();
        },
        
        onDialogShown: function() {
            this.$el.putFocus();
        },
        
        onDialogHidden: function () {
            if (this.canceled && this.cancel) {
                this.cancel();
            } else {
                if (this.ok) {
                    this.ok();
                }
            }
        }
    });
    
})(Backbone, Application || (Application = {}));