(function() {
  var $, animationDuration, timeout;

  $ = jQuery;

  $.fn.serializeFields = function() {
    var fields;

    fields = {};
    this.each(function() {
      return $.each($(this).serializeArray(), function() {
        return fields[this.name] = this.value;
      });
    });
    return fields;
  };

  $.fn.deserializeFields = function(attributes) {
    return this.each(function() {
      var _this = this;

      return _(attributes).chain().keys().each(function(key) {
        return $(_this).find(":input[name='" + key + "']").val(attributes[key]);
      });
    });
  };

  $.fn.resetFields = function() {
    return this.each(function() {
      var container;

      container = $(this);
      if (container.is('form')) {
        return container.get(0).reset();
      }
      return container.find('form').each(function() {
        return this.reset();
      });
    });
  };

  animationDuration = 400;

  timeout = 1000 * 5;

  $.fn.hideFieldErrors = function() {
    return this.each(function() {
      return $(this).find('.control-group').filter('.error').removeClass('error').find('.help-block,.help-inline').slideUp(animationDuration, function() {
        return $(this).remove();
      });
    });
  };

  $.fn.showFieldErrors = function(options) {
    var cssClass, errors, firstInput,
      _this = this;

    options = $.extend({
      inline: false,
      errors: {}
    }, options);
    cssClass = options.inline ? 'help-inline' : 'help-block';
    errors = options.errors || {};
    firstInput = null;
    this.each(function() {
      return $(this).find(':input').each(function() {
        var input, inputName, lowerCasedInputName;

        input = $(this);
        inputName = input.attr('name');
        if (!inputName) {
          return false;
        }
        lowerCasedInputName = inputName.toLowerCase();
        return _(errors).chain().keys().filter(function(key) {
          return errors[key].length;
        }).filter(function(key) {
          return key.toLowerCase() === lowerCasedInputName;
        }).each(function(key) {
          var container;

          if (!firstInput) {
            firstInput = input;
          }
          input.closest('.control-group').addClass('error');
          container = options.inline ? input.parent() : input.closest('.controls');
          return _(errors[key]).each(function(message) {
            return $('<span>', {
              text: message,
              'class': cssClass
            }).appendTo(container).hide().slideDown(animationDuration);
          });
        });
      });
    });
    if (firstInput) {
      firstInput.first().focus();
    }
    _(function() {
      return _this.hideFieldErrors();
    }).delay(timeout);
    return this;
  };

  $.fn.hideSummaryError = function() {
    return this.each(function() {
      var container;

      container = $(this);
      if (!container.is('form')) {
        container = container.find('form');
      }
      return container.find('.alert').slideUp(animationDuration, function() {
        return $(this).remove();
      });
    });
  };

  (function() {
    var template;

    template = _("<div class=\"alert alert-error fade in\">\n  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" title=\"close\">&times;</button>\n  <i class=\"icon-warning-sign\"></i> \n  <span>{{message}}</span>\n</div>").template();
    return $.fn.showSummaryError = function(options) {
      var _this = this;

      options = $.extend({
        message: 'An unexpected error has occurred while performing your last operation.'
      }, options);
      this.each(function() {
        var container;

        container = $(this);
        if (!container.is('form')) {
          container = container.find('form');
        }
        return $(template({
          message: options.message
        })).prependTo(container).hide().slideDown(animationDuration);
      });
      return _(function() {
        return _this.hideSummaryError();
      }).delay(timeout);
    };
  })();

  $.fn.putFocus = function() {
    var _this = this;

    _(function() {
      return _this.find(':input').not(':button').not(':disabled').first().focus();
    }).delay(100);
    return this;
  };

}).call(this);
