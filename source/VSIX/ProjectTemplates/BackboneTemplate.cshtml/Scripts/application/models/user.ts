/// <reference path="../../typings/underscore/underscore-typed.d.ts" />
/// <reference path="../../typings/backbone/backbone.d.ts" />

/// <reference path="../application.d.ts" />
/// <reference path="validation.ts" />

module Application.Models {
    export interface IUserAttributes {
        email: string;
        password: string;
        confirmPassword: string;
    }

    export class User extends Backbone.Model {
        urlRoot() {
            return serverUrlPrefix + '/users'
        }

        defaults(): IUserAttributes {
            return {
                email: null,
                password: null,
                confirmPassword: null
            }
        }

        validate(attributes: IUserAttributes) {
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

            if (attributes.password) {
                if (!Validation.isValidPasswordLength(attributes.password)) {
                    Validation.addError(
                        errors,
                        'password',
                        'Password length must be between 6 to 64 characters.');
                }
            } else {
                Validation.addError(
                    errors,
                    'password',
                    'Password is required.');
            }

            if (attributes.confirmPassword) {
                if (attributes.confirmPassword !== attributes.password) {
                    Validation.addError(
                        errors,
                        'confirmPassword',
                        'Password and confirm password do not match.');
                }
            } else {
                Validation.addError(
                    errors,
                    'confirmPassword',
                    'Confirm password is required.');
            }

            if (!_.isEmpty(errors)) {
                return errors;
            }
        }
    }
}