/// <reference path="../../typings/underscore/underscore-typed.d.ts" />
/// <reference path="../../typings/backbone/backbone.d.ts" />

/// <reference path="../application.d.ts" />
/// <reference path="validation.ts" />

module Application.Models {
    export interface IChangePasswordAttributes {
        oldPassword: string;
        newPassword: string;
        confirmPassword: string;
    }

    export class ChangePassword extends Backbone.Model {
        urlRoot() {
            return serverUrlPrefix + '/passwords/change';
        }

        defaults(): IChangePasswordAttributes {
            return {
                oldPassword: null,
                newPassword: null,
                confirmPassword: null
            }
        }

        validate(attributes: IChangePasswordAttributes) {
            var errors = {};

            if (!attributes.oldPassword) {
                Validation.addError(
                    errors,
                    'oldPassword',
                    'Old password is required.');
            }

            if (attributes.newPassword) {
                if (!Validation.isValidPasswordLength(
                    attributes.newPassword)) {
                    Validation.addError(
                        errors,
                        'newPassword',
                        'New password length must be between 6 to 64 ' +
                        'characters.');
                }
            } else {
                Validation.addError(
                    errors,
                    'newPassword',
                    'New password is required.');
            }

            if (attributes.confirmPassword) {
                if (attributes.confirmPassword !== attributes.newPassword) {
                    Validation.addError(
                        errors,
                        'confirmPassword',
                        'New password and confirm password do not match.');
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