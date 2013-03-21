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
            this.activate(this.aboutView);
            this.navigationView.select('about');
        };
        Router.prototype.home = function () {
            this.activate(this.homeView);
            this.navigationView.select('home');
        };
        Router.prototype.notFound = function () {
            this.navigationView.deselectAll();
            this.activate(this.notFoundView);
        };
        Router.prototype.activate = function (view) {
            _.each(this.views, function (view) {
                return view.deactivate();
            });
            (view).activate();
        };
        Router.prototype.initialize = function () {
            this.navigationView = new Application.Views.Navigation();
            var pageTemplate = _.template($('#page-template').html());
            this.views = [];
            this.homeView = new Application.Views.Page({
                className: 'page',
                template: pageTemplate,
                model: new Backbone.Model({
                    title: 'Home',
                    message: 'Welcome to Backbone SPA.'
                })
            }).render();
            this.views.push(this.homeView);
            this.aboutView = new Application.Views.Page({
                className: 'page',
                template: pageTemplate,
                model: new Backbone.Model({
                    title: 'About',
                    message: 'Tell about your app.'
                })
            }).render();
            this.views.push(this.aboutView);
            $('#container').prepend(this.homeView.$el, this.aboutView.$el);
            this.notFoundView = new Application.Views.NotFound();
            this.views.push(this.notFoundView);
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
