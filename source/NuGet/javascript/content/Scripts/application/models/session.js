var Application;

(function (_, Backbone, Application) {
    var Models = Application.Models || (Application.Models = {});

    Models.Session = Backbone.Model.extend({
        urlRoot: function () {
            return Application.serverUrlPrefix + '/sessions';
        },

        defaults: function () {
            return {
                email: null,
                password: null,
                rememberMe: false
            };
        },

        validate: function (attributes) {
            var Validation = Models.Validation;
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

            return _.isEmpty(errors) ? void (0) : errors;
        }
    });

})(_, Backbone, Application || (Application = {}));
