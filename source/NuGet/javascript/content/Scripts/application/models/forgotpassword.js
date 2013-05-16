var Application;

(function (_, Backbone, Application) {
    var Models = Application.Models || (Application.Models = {});

    Models.ForgotPassword = Backbone.Model.extend({
        urlRoot: function() {
            return Application.serverUrlPrefix + '/passwords/forgot';
        },
        
        defaults: function() {
            return {
              email: null  
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

            return _.isEmpty(errors) ? void(0) : errors;
        }
    });

})(_, Backbone, Application || (Application = {}));
