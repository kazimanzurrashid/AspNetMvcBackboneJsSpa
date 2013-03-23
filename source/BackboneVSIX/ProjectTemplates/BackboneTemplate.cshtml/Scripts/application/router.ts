/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/underscore/underscore.d.ts" />
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
            this.navigationView = new Views.Navigation;

            var pageTemplate = _.template($('#page-template').html());

            this.homeView = new Views.Page({
                className: 'page',
                template: pageTemplate,
                model: new Backbone.Model({
                    title: 'Home',
                    message: 'Welcome to Backbone.js SPA.'
                })
            }).render();

            this.aboutView = new Views.Page({
                className: 'page',
                template: pageTemplate,
                model: new Backbone.Model({
                    title: 'About',
                    message: 'Tell us about your app.'
                })
            }).render();

            $('#container').prepend(this.homeView.$el, this.aboutView.$el);

            this.notFoundView = new Views.NotFound;
        }
    }

    Router.prototype.routes = {
        '!/about': 'about',
        '!/': 'home',
        '*path': 'notFound'
    };
}