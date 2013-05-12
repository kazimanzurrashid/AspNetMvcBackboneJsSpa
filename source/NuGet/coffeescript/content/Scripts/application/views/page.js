(function() {
  var App, Views, exports,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  exports = this;

  App = exports.Application || (exports.Application = {});

  Views = App.Views || (App.Views = {});

  Views.Page = (function(_super) {

    __extends(Page, _super);

    function Page() {
      return Page.__super__.constructor.apply(this, arguments);
    }

    Page.prototype.initialize = function(options) {
      this.template = options.template;
      this.listenTo(this.model, 'change', this.render);
      return this.listenTo(this.model, 'destroy', this.remove);
    };

    Page.prototype.render = function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    };

    return Page;

  })(Backbone.View);

  _(Views.Page.prototype).extend(Views.Activable);

}).call(this);
