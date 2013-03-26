/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/underscore/underscore.d.ts" />
/// <reference path="../../typings/backbone/backbone.d.ts" />

/// <reference path="activable.ts" />

module Application.Views {
    export interface PageOptions extends Backbone.ViewOptions {
        template: (model: Object) => string;
    }

    export class Page extends Backbone.View {
        $el: JQuery;
        template: (model: Object) => string;

        constructor (options?: PageOptions) {
            super(options);
        }

        render() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

        initialize(options: PageOptions) {
            this.template = options.template;
            (<any>this).listenTo(this.model, 'change', this.render);
            (<any>this).listenTo(this.model, 'destroy', this.remove);
        }
    }

    _.extend(Page.prototype, Activable);
}