var Application;

(function ($, _, Application) {
    var Views = Application.Views || (Application.Views = {});

    Views.Helpers = {
        hasModelErrors: function(jqxhr) {
            return jqxhr.status === 400;
        },
        
        getModelErrors: function(jqxhr) {
            var response = null;

            try {
                response = $.parseJSON(jqxhr.responseText);
            }
            catch(e) {
            }

            if (!response) {
                return void (0);
            }

            var modelStateProperty = _.chain(response)
                .keys()
                .filter(function(key) {
                    return key.toLowerCase() === 'modelstate';
                })
                .first()
                .value();

            return modelStateProperty ?
                response[modelStateProperty] :
                void(0);
        },
        
        subscribeModelInvalidEvent: function(model, el) {
            model.once('invalid', function() {
                el.showFieldErrors({
                    errors: model.validationError
                });
            });
        }
    };

})(jQuery, _, Application || (Application = {}));
