var Application;

(function (_, Backbone, Application) {
    var Models = Application.Models || (Application.Models = {});

    Models.ChangePassword = Backbone.Model.extend({
        urlRoot: function () {
            return Application.serverUrlPrefix + '/passwords/change';
        },

        defaults: function () {
            return {
                oldPassword: null,
                newPassword: null,
                confirmPassword: null
            };
        },

        validate: function (attributes) {
            var Validation = Models.Validation;
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

            return _.isEmpty(errors) ? void (0) : errors;
        }
    });

})(_, Backbone, Application || (Application = {}));
