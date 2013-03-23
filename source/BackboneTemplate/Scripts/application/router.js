var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Application;
(function (Application) {
    var $ = jQuery;
    var Router = (function (_super) {
        __extends(Router, _super);
        function Router() {
            _super.apply(this, arguments);

        }
        Router.prototype.about = function () {
            this.activate(this.aboutView, 'about');
        };
        Router.prototype.home = function () {
            this.activate(this.homeView, 'home');
        };
        Router.prototype.notFound = function () {
            this.activate(this.notFoundView);
        };
        Router.prototype.activate = function (view, menu) {
            if(this.currentView) {
                this.currentView.deactivate();
            }
            if(menu) {
                this.navigationView.select(menu);
            } else {
                this.navigationView.deselectAll();
            }
            this.currentView = view;
            this.currentView.activate();
        };
        Router.prototype.initialize = function () {
            this.navigationView = new Application.Views.Navigation();
            var pageTemplate = _.template($('#page-template').html());
            this.homeView = new Application.Views.Page({
                className: 'page',
                template: pageTemplate,
                model: new Backbone.Model({
                    title: 'Home',
                    message: 'Welcome to Backbone.js SPA.'
                })
            }).render();
            this.aboutView = new Application.Views.Page({
                className: 'page',
                template: pageTemplate,
                model: new Backbone.Model({
                    title: 'About',
                    message: 'Tell us about your app.'
                })
            }).render();
            $('#container').prepend(this.homeView.$el, this.aboutView.$el);
            this.notFoundView = new Application.Views.NotFound();
        };
        return Router;
    })(Backbone.Router);
    Application.Router = Router;    
    Router.prototype.routes = {
        '!/about': 'about',
        '!/': 'home',
        '*path': 'notFound'
    };
})(Application || (Application = {}));
