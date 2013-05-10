var Application;
(function (Application) {
    (function (Views) {
        var $ = jQuery;
        function hasModelErrors(jqxhr) {
            return jqxhr.status === 400;
        }
        Views.hasModelErrors = hasModelErrors;
        function getModelErrors(jqxhr) {
            var response;
            try  {
                response = $.parseJSON(jqxhr.responseText);
            } catch (e) {
            }
            if(response) {
                var modelStateProperty = _.chain(response).keys().filter(function (key) {
                    return key.toLowerCase() === 'modelstate';
                }).first().value();
                if(modelStateProperty) {
                    return response[modelStateProperty];
                }
            }
            return void (0);
        }
        Views.getModelErrors = getModelErrors;
        function subscribeModelInvalidEvent(model, el) {
            model.once('invalid', function () {
                return el.showFieldErrors({
                    errors: model.validationError
                });
            });
        }
        Views.subscribeModelInvalidEvent = subscribeModelInvalidEvent;
    })(Application.Views || (Application.Views = {}));
    var Views = Application.Views;
})(Application || (Application = {}));
