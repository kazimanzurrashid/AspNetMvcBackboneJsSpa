var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Application;
(function (Application) {
    (function (Models) {
        var ForgotPassword = (function (_super) {
            __extends(ForgotPassword, _super);
            function ForgotPassword() {
                _super.apply(this, arguments);

            }
            ForgotPassword.prototype.urlRoot = function () {
                return Application.serverUrlPrefix + '/passwords/forgot';
            };
            ForgotPassword.prototype.defaults = function () {
                return {
                    email: null
                };
            };
            ForgotPassword.prototype.validate = function (attributes) {
                var errors = {
                };
                if(attributes.email) {
                    if(!Models.Validation.isValidEmailFormat(attributes.email)) {
                        Models.Validation.addError(errors, 'email', 'Invalid email address format.');
                    }
                } else {
                    Models.Validation.addError(errors, 'email', 'Email is required.');
                }
                if(!_.isEmpty(errors)) {
                    return errors;
                }
            };
            return ForgotPassword;
        })(Backbone.Model);
        Models.ForgotPassword = ForgotPassword;        
    })(Application.Models || (Application.Models = {}));
    var Models = Application.Models;
})(Application || (Application = {}));
