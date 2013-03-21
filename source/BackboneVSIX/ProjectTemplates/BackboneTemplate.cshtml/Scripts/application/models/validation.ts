module Application.Models {
    export interface IValidationResult {
        errors: Object;
    }

    var emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    export var Validation = {
        addError: function(errors: Object, attribute: string, message: string) {
            (errors[attribute] || (errors[attribute] = [])).push(message);
        },

        isValidEmailFormat:  function(value: string) {
            return value && emailRegex.test(value);
        },

        isValidPasswordLength: function(value: string) {
            return value && value.length >= 6 && value.length <= 64;
        }
    }
}