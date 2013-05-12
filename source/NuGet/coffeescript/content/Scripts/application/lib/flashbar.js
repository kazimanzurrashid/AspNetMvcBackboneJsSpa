(function() {
  var animationDuration, showFlashbar, template, timeout;

  timeout = 1000 * 7;

  animationDuration = 400;

  template = _("<div class=\"alert alert-{{type}} fade.in flash-bar hide\">\n  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" title=\"close\">&times;</button>\n  <i class=\"{{icon}}\"></i>\n  <span>{{message}}</span>\n</div>").template();

  showFlashbar = function(type, message) {
    var flashbar, icon;
    icon = (function() {
      switch (type) {
        case 'success':
          return 'icon-ok-sign';
        case 'error':
          return 'icon-warning-sign';
        case 'info':
          return 'icon-info-sign';
        default:
          throw new Error('Unknown Type.');
      }
    })();
    flashbar = $(template({
      icon: icon,
      type: type,
      message: message
    })).prependTo('body').alert().slideDown(animationDuration);
    return _(function() {
      return flashbar.slideUp(animationDuration, function() {
        return flashbar.remove();
      });
    }).delay(timeout);
  };

  $.showSuccessbar = function(message) {
    return showFlashbar('success', message);
  };

  $.showErrorbar = function(message) {
    return showFlashbar('error', message);
  };

  $.showInfobar = function(message) {
    return showFlashbar('info', message);
  };

}).call(this);
