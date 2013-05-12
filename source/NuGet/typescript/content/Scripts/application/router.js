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
                if(this.currentView == view) {
                    return;
                }
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
                    content: '<h4>Welcome to Backbone.js SPA</h4>' + '<p>Backbone.js SPA is starter kit template to develop ' + 'single page application with Backbone.js in ' + 'Microsoft Technology Stack. Some of the key ' + 'technology used in this template are:</p>' + '<ol>' + '<li><a href="http://backbonejs.org/">Backbone.js</a></li>' + '<li><a href="http://www.typescriptlang.org/">TypeScript</a></li>' + '<li><a href="http://twitter.github.com/bootstrap/">Twitter Bootstrap</a></li>' + '<li><a href="http://fortawesome.github.com/Font-Awesome/">Font Awesome</a></li>' + '<li><a href="http://aboutcode.net/postal/">Postal</a></li>' + '<li><a href="http://www.asp.net/web-api">ASP.NET Web API</a></li>' + '<li><a href="http://www.asp.net/mvc">ASP.NET MVC</a></li>' + '<li>and many more...</li>' + '</ol>' + '<p>To get the latest update visit the ' + '<a href="https://github.com/kazimanzurrashid/AspNetMvcBackboneJsSpa">Project Page</a> ' + 'or follow me <a href="https://twitter.com/manzurrashid">@manzurrashid</a>.</p>'
                })
            });
            this.aboutView = new Application.Views.Page({
                className: 'page',
                template: pageTemplate,
                model: new Backbone.Model({
                    title: 'About',
                    content: 'Tell us about your app.'
                })
            });
            $('#container').prepend(this.homeView.render().$el, this.aboutView.render().$el);
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
