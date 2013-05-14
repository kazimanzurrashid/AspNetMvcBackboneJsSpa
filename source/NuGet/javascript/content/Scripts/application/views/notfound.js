var Application;

(function(_, Backbone, Application) {
    var Views = Application.Views || (Application.Views = {});

    Views.NotFound = Backbone.View.extend({
        el: '#not-found-page'
    });

    _.extend(Views.NotFound.prototype, Views.Activable);

})(_, Backbone, Application || (Application = {}));
