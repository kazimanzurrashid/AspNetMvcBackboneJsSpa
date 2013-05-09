/// <reference path="../../typings/underscore/underscore-typed.d.ts" />
/// <reference path="../../typings/backbone/backbone.d.ts" />

/// <reference path="activable.ts" />

module Application.Views {
    export class NotFound extends Backbone.View {
    }

    NotFound.prototype.el = '#not-found-page';

    _.extend(NotFound.prototype, Activable);
}