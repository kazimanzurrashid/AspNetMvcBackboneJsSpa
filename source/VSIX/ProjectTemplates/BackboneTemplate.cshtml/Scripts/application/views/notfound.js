var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Application;
(function (Application) {
    (function (Views) {
        var NotFound = (function (_super) {
            __extends(NotFound, _super);
            function NotFound() {
                _super.apply(this, arguments);

            }
            return NotFound;
        })(Backbone.View);
        Views.NotFound = NotFound;        
        NotFound.prototype.el = '#not-found-page';
        _.extend(NotFound.prototype, Views.Activable);
    })(Application.Views || (Application.Views = {}));
    var Views = Application.Views;
})(Application || (Application = {}));
