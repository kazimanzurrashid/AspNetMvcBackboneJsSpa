var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Application;
(function (Application) {
    (function (Models) {
        var User = (function (_super) {
            __extends(User, _super);
            function User() {
                _super.apply(this, arguments);

            }
            User.prototype.urlRoot = function () {
                return Application.serverUrlPrefix + '/users';
            };
            User.prototype.defaults = function () {
                return {
                    email: null,
                    password: null,
                    confirmPassword: null
                };
            };
            User.prototype.validate = function (attributes) {
                var errors = {
                };
                if(attributes.email) {
                    if(!Models.Validation.isValidEmailFormat(attributes.email)) {
                        Models.Validation.addError(errors, 'email', 'Invalid email address format.');
                    }
                } else {
                    Models.Validation.addError(errors, 'email', 'Email is required.');
                }
                if(attributes.password) {
                    if(!Models.Validation.isValidPasswordLength(attributes.password)) {
                        Models.Validation.addError(errors, 'password', 'Password length must be between 6 to 64 characters.');
                    }
                } else {
                    Models.Validation.addError(errors, 'password', 'Password is required.');
                }
                if(attributes.confirmPassword) {
                    if(attributes.confirmPassword !== attributes.password) {
                        Models.Validation.addError(errors, 'confirmPassword', 'Password and confirm password do not match.');
                    }
                } else {
                    Models.Validation.addError(errors, 'confirmPassword', 'Confirm password is required.');
                }
                if(!_.isEmpty(errors)) {
                    return errors;
                }
            };
            return User;
        })(Backbone.Model);
        Models.User = User;        
    })(Application.Models || (Application.Models = {}));
    var Models = Application.Models;
})(Application || (Application = {}));
