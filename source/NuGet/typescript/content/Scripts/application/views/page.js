var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Application;
(function (Application) {
    (function (Views) {
        var Page = (function (_super) {
            __extends(Page, _super);
            function Page(options) {
                        _super.call(this, options);
            }
            Page.prototype.render = function () {
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            };
            Page.prototype.initialize = function (options) {
                this.template = options.template;
                this.listenTo(this.model, 'change', this.render);
                this.listenTo(this.model, 'destroy', this.remove);
            };
            return Page;
        })(Backbone.View);
        Views.Page = Page;        
        _.extend(Page.prototype, Views.Activable);
    })(Application.Views || (Application.Views = {}));
    var Views = Application.Views;
})(Application || (Application = {}));
