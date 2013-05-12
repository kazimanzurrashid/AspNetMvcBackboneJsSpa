(function() {
  var $, App, Views, exports;

  exports = this;

  App = exports.Application || (exports.Application = {});

  Views = App.Views || (App.Views = {});

  $ = jQuery;

  Views.Helpers = {
    hasModelErrors: function(jqxhr) {
      return jqxhr.status === 400;
    },
    getModelErrors: function(jqxhr) {
      var e, modelStateProperty, response;

      response = null;
      try {
        response = $.parseJSON(jqxhr.responseText);
      } catch (_error) {
        e = _error;
      }
      if (!response) {
        return void 0;
      }
      modelStateProperty = _(response).chain().keys().filter(function(key) {
        return key.toLowerCase() === 'modelstate';
      }).first().value();
      if (modelStateProperty) {
        return response[modelStateProperty];
      } else {
        return void 0;
      }
    },
    subscribeModelInvalidEvent: function(model, el) {
      return model.once('invalid', function() {
        return el.showFieldErrors({
          errors: model.validationError
        });
      });
    }
  };

}).call(this);
