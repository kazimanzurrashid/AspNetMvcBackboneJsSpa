var Application;

(function($, Backbone, Application) {
    var Views = Application.Views || (Application.Views = {});

    Views.Navigation = Backbone.View.extend({
        el: '#navigation',

        events: {
            'click [data-command]': 'handleCommand'
        },

        select: function(view) {
            return this.deselectAll().filter('.' + view).addClass('active');
        },

        deselectAll: function() {
            return this.$('.nav > li').removeClass('active');
        },

        handleCommand: function(e) {
            var command = $(e.currentTarget).attr('data-command');

            if (command) {
                Application.events.trigger(command);
            }
        }
    });

})(jQuery, Backbone, Application || (Application = {}));
