var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Application;
(function (Application) {
    (function (Views) {
        var $ = jQuery;
        var Navigation = (function (_super) {
            __extends(Navigation, _super);
            function Navigation() {
                _super.apply(this, arguments);

            }
            Navigation.prototype.select = function (view) {
                return this.deselectAll().filter('.' + view).addClass('active');
            };
            Navigation.prototype.deselectAll = function () {
                return this.$('.nav > li').removeClass('active');
            };
            Navigation.prototype.handleCommand = function (e) {
                var command = $(e.currentTarget).attr('data-command');
                if(command) {
                    Application.events.trigger(command);
                }
            };
            return Navigation;
        })(Backbone.View);
        Views.Navigation = Navigation;        
        Navigation.prototype.el = '#navigation';
        Navigation.prototype.events = {
            'click [data-command]': 'handleCommand'
        };
    })(Application.Views || (Application.Views = {}));
    var Views = Application.Views;
})(Application || (Application = {}));
