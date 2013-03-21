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
        views: Views.IActivable[];

        about() {
            this.activate(this.aboutView);
            this.navigationView.select('about');
        }

        home() {
            this.activate(this.homeView);
            this.navigationView.select('home');
        }

        notFound() {
            this.navigationView.deselectAll();
            this.activate(this.notFoundView);
        }

        activate(view: Backbone.View) {
            _.each(this.views, (view: Views.IActivable) => view.deactivate());
            (<Views.IActivable><any>view).activate();
        }

        initialize() {
            this.navigationView = new Views.Navigation;

            var pageTemplate = _.template($('#page-template').html());

            this.views = [];

            this.homeView = new Views.Page({
                className: 'page',
                template: pageTemplate,
                model: new Backbone.Model({
                    title: 'Home',
                    message: 'Welcome to Backbone SPA.'
                })
            }).render();
            this.views.push(<Views.IActivable><any>this.homeView);

            this.aboutView = new Views.Page({
                className: 'page',
                template: pageTemplate,
                model: new Backbone.Model({
                    title: 'About',
                    message: 'Tell about your app.'
                })
            }).render();
            this.views.push(<Views.IActivable><any>this.aboutView);

            $('#container').prepend(this.homeView.$el, this.aboutView.$el);

            this.notFoundView = new Views.NotFound;
            this.views.push(<Views.IActivable><any>this.notFoundView);
        }
    }

    Router.prototype.routes = {
        '!/about': 'about',
        '!/': 'home',
        '*path': 'notFound'
    };
}