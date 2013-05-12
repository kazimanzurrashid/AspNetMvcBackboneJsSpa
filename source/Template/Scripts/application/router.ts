/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/underscore/underscore-typed.d.ts" />
/// <reference path="../typings/backbone/backbone.d.ts" />

/// <reference path="views/navigation.ts" />
/// <reference path="views/activable.ts" />
/// <reference path="views/page.ts" />
/// <reference path="views/notfound.ts" />

module Application {
    var $ = jQuery;

    export class Router extends Backbone.Router {
        navigationView: Views.Navigation;
        homeView: Views.Page;
        aboutView: Views.Page;
        notFoundView: Views.NotFound;
        currentView: Views.IActivable;

        about() {
            this.activate(this.aboutView, 'about');
        }

        home() {
            this.activate(this.homeView, 'home');
        }

        notFound() {
            this.activate(this.notFoundView);
        }

        activate(view: Backbone.View, menu?: string) {
            if (this.currentView) {
                if (this.currentView == <Views.IActivable><any>view) {
                    return;
                }
                this.currentView.deactivate();
            }

            if (menu) {
                this.navigationView.select(menu);
            } else {
                this.navigationView.deselectAll();
            }

            this.currentView = <Views.IActivable><any>view;
            this.currentView.activate();
        }

        initialize() {
            this.navigationView = new Views.Navigation();

            var pageTemplate = _.template($('#page-template').html());

            this.homeView = new Views.Page({
                className: 'page',
                template: pageTemplate,
                model: new Backbone.Model({
                    title: 'Home',
                    content: '<h4>Welcome to Backbone.js SPA</h4>' +
                        '<p>Backbone.js SPA is starter kit template to develop ' +
                        'single page application with Backbone.js in ' +
                        'Microsoft Technology Stack. Some of the key ' +
                        'technology used in this template are:</p>' +
                        '<ol>' +
                        '<li><a href="http://backbonejs.org/">Backbone.js</a></li>' +
                        '<li><a href="http://www.typescriptlang.org/">TypeScript</a></li>' +
                        '<li><a href="http://twitter.github.com/bootstrap/">Twitter Bootstrap</a></li>' +
                        '<li><a href="http://fortawesome.github.com/Font-Awesome/">Font Awesome</a></li>' +
                        '<li><a href="http://aboutcode.net/postal/">Postal</a></li>' +
                        '<li><a href="http://www.asp.net/web-api">ASP.NET Web API</a></li>' +
                        '<li><a href="http://www.asp.net/mvc">ASP.NET MVC</a></li>' +
                        '<li>and many more...</li>' +
                        '</ol>' +
                        '<p>To get the latest update visit the ' +
                        '<a href="https://github.com/kazimanzurrashid/AspNetMvcBackboneJsSpa">Project Page</a> ' +
                        'or follow me <a href="https://twitter.com/manzurrashid">@manzurrashid</a>.</p>'
                })
            });

            this.aboutView = new Views.Page({
                className: 'page',
                template: pageTemplate,
                model: new Backbone.Model({
                    title: 'About',
                    content: 'Tell us about your app.'
                })
            });

            $('#container').prepend(this.homeView.render().$el, this.aboutView.render().$el);

            this.notFoundView = new Views.NotFound();
        }
    }

    Router.prototype.routes = {
        '!/about': 'about',
        '!/': 'home',
        '*path': 'notFound'
    };
}