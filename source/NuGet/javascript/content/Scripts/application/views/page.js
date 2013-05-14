var Application;

(function (_, Backbone, Application) {
    var Views = Application.Views || (Application.Views = {});

    Views.Page = Backbone.View.extend({
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        initialize: function(options) {
            this.template = options.template;
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        }
    });

    _.extend(Views.Page.prototype, Views.Activable);

})(_, Backbone, Application || (Application = {}));
