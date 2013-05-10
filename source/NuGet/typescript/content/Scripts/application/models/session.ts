/// <reference path="../../typings/underscore/underscore-typed.d.ts" />
/// <reference path="../../typings/backbone/backbone.d.ts" />

/// <reference path="../application.d.ts" />
/// <reference path="validation.ts" />

module Application.Models {
    export interface ISessionAttributes {
        id?: number;
        email: string;
        password: string;
        rememberMe: bool;
    }

    export class Session extends Backbone.Model {
        urlRoot() {
            return serverUrlPrefix + '/sessions'
        }

        defaults(): ISessionAttributes {
            return {
                email: null,
                password: null,
                rememberMe: false
            }
        }

        validate(attributes: ISessionAttributes) {
            var errors = {};

            if (!attributes.email) {
                Validation.addError(errors, 'email', 'Email is required.');
            }

            if (!attributes.password) {
                Validation.addError(
                    errors,
                    'password',
                    'Password is required.');
            }

            if (!_.isEmpty(errors)) {
                return errors;
            }
        }
    }
}