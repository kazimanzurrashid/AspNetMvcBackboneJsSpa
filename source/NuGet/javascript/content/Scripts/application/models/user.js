var Application;

(function (_, Backbone, Application) {
    var Models = Application.Models || (Application.Models = {});

    Models.User = Backbone.Model.extend({
        urlRoot: function () {
            return Application.serverUrlPrefix + '/users';
        },

        defaults: function () {
            return {
                email: null,
                password: null,
                confirmPassword: null
            };
        },

        validate: function (attributes) {
            var Validation = Models.Validation;
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

            return _.isEmpty(errors) ? void (0) : errors;
        }
    });

})(_, Backbone, Application || (Application = {}));
