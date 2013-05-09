var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Application;
(function (Application) {
    (function (Models) {
        var Session = (function (_super) {
            __extends(Session, _super);
            function Session() {
                _super.apply(this, arguments);

            }
            Session.prototype.urlRoot = function () {
                return Application.serverUrlPrefix + '/sessions';
            };
            Session.prototype.defaults = function () {
                return {
                    email: null,
                    password: null,
                    rememberMe: false
                };
            };
            Session.prototype.validate = function (attributes) {
                var errors = {
                };
                if(!attributes.email) {
                    Models.Validation.addError(errors, 'email', 'Email is required.');
                }
                if(!attributes.password) {
                    Models.Validation.addError(errors, 'password', 'Password is required.');
                }
                if(!_.isEmpty(errors)) {
                    return errors;
                }
            };
            return Session;
        })(Backbone.Model);
        Models.Session = Session;        
    })(Application.Models || (Application.Models = {}));
    var Models = Application.Models;
})(Application || (Application = {}));
