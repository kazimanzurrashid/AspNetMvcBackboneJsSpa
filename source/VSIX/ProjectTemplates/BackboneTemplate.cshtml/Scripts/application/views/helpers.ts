/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/backbone/backbone.d.ts" />
/// <reference path="../../typings/underscore/underscore-typed.d.ts" />

/// <reference path="../lib/form.ts" />

module Application.Views {
    var $ = jQuery;

    export var Helpers = {
        hasModelErrors: (jqxhr: { status: number; }){
            return jqxhr.status === 400;
        },

        getModelErrors: (jqxhr: { responseText: string; }): Object {
            var response: any;

            try {
                response = $.parseJSON(jqxhr.responseText);
            }
            catch(e) {
            }

            if (!response) {
                return void (0);
            }

            var modelStateProperty = <string>_.chain(response)
                .keys()
                .filter((key: string) => key.toLowerCase() === 'modelstate')
                .first()
                .value();

            return modelStateProperty ? response[modelStateProperty] : void (0);
        },

        subscribeModelInvalidEvent: (model: Backbone.Model, el: JQuery) {
            model.once('invalid', () =>
                el.showFieldErrors({ errors: model.validationError }));
        }
    };
}