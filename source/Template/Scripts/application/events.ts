/// <reference path="../typings/underscore/underscore-typed.d.ts" />
/// <reference path="../typings/backbone/backbone.d.ts" />

module Application {
    export interface ICancelableEventArgs {
        cancel?: () => void;
    }

    export interface IRequiresSignInEventArgs extends ICancelableEventArgs {
        ok?: () => void;
    }

    export var events = <Backbone.Events>_.extend({}, Backbone.Events);
}