/// <reference path="../../typings/underscore/underscore-typed.d.ts" />
/// <reference path="../../typings/backbone/backbone.d.ts" />

/// <reference path="../application.d.ts" />
/// <reference path="validation.ts" />

module Application.Models {
    export interface IForgotPasswordAttributes {
        email: string;
    }

    export class ForgotPassword extends Backbone.Model {
        urlRoot() {
            return serverUrlPrefix + '/passwords/forgot'
        }

        defaults(): IForgotPasswordAttributes {
            return {
                email: null
            }
        }

        validate(attributes: IForgotPasswordAttributes) {
            var errors = {};

            if (attributes.email) {
                if (!Validation.isValidEmailFormat(attributes.email)) {
                    Validation.addError(
                        errors,
                        'email',
                        'Invalid email address format.');
                }
            } else {
                Validation.addError(errors, 'email', 'Email is required.');
            }

            if (!_.isEmpty(errors)) {
                return errors;
            }
        }
    }
}