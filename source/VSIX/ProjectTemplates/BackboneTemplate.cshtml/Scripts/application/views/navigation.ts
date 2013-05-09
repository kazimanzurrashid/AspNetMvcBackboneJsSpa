/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/backbone/backbone.d.ts" />

/// <reference path="../events.ts" />

module Application.Views {
    var $ = jQuery;

    export class Navigation extends Backbone.View {
        select(view: string) {
            return this.deselectAll().filter('.' + view).addClass('active');
        }

        deselectAll(): JQuery {
            return this.$('.nav > li').removeClass('active');
        }

        handleCommand(e: JQueryEventObject) {
            var command = $(e.currentTarget).attr('data-command');
            if (command) {
                events.trigger(command);
            }
        }
    }

    Navigation.prototype.el = '#navigation';
    Navigation.prototype.events = {
        'click [data-command]': 'handleCommand'
    };
}