var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Application;
(function (Application) {
    (function (Models) {
        var ChangePassword = (function (_super) {
            __extends(ChangePassword, _super);
            function ChangePassword() {
                _super.apply(this, arguments);

            }
            ChangePassword.prototype.urlRoot = function () {
                return Application.serverUrlPrefix + '/passwords/change';
            };
            ChangePassword.prototype.defaults = function () {
                return {
                    oldPassword: null,
                    newPassword: null,
                    confirmPassword: null
                };
            };
            ChangePassword.prototype.validate = function (attributes) {
                var errors = {
                };
                if(!attributes.oldPassword) {
                    Models.Validation.addError(errors, 'oldPassword', 'Old password is required.');
                }
                if(attributes.newPassword) {
                    if(!Models.Validation.isValidPasswordLength(attributes.newPassword)) {
                        Models.Validation.addError(errors, 'newPassword', 'New password length must be between 6 to 64 ' + 'characters.');
                    }
                } else {
                    Models.Validation.addError(errors, 'newPassword', 'New password is required.');
                }
                if(attributes.confirmPassword) {
                    if(attributes.confirmPassword !== attributes.newPassword) {
                        Models.Validation.addError(errors, 'confirmPassword', 'New password and confirm password do not match.');
                    }
                } else {
                    Models.Validation.addError(errors, 'confirmPassword', 'Confirm password is required.');
                }
                if(!_.isEmpty(errors)) {
                    return errors;
                }
            };
            return ChangePassword;
        })(Backbone.Model);
        Models.ChangePassword = ChangePassword;        
    })(Application.Models || (Application.Models = {}));
    var Models = Application.Models;
})(Application || (Application = {}));
