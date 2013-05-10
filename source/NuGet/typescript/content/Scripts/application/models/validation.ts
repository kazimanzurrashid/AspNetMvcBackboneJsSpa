module Application.Models {
    var emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    export var Validation = {
        addError: (errors: Object, attribute: string, message: string) =>
            (errors[attribute] || (errors[attribute] = [])).push(message),

        isValidEmailFormat: (value: string) => value && emailRegex.test(value),

        isValidPasswordLength: (value: string) => 
            value && value.length >= 6 && value.length <= 64
    }
}