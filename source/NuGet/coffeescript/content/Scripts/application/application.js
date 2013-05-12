(function() {
  var $, App, attachEventHandlers, createViews, exports, hasClientUrl, redirectToDefault, showInfobar,
    __slice = [].slice;

  exports = this;

  App = exports.Application || (exports.Application = {});

  $ = jQuery;

  hasClientUrl = function() {
    var hash;

    hash = window.location.hash;
    if (hash.length > App.clientUrlPrefix.length) {
      return true;
    }
    if (App.clientUrlPrefix.indexOf(hash === 0)) {
      return false;
    }
    return true;
  };

  redirectToDefault = function() {
    return App.router.navigate(App.clientUrl('/'), true);
  };

  showInfobar = function(message) {
    return _(function() {
      return $.showInfobar(message);
    }).delay(400);
  };

  attachEventHandlers = function() {
    var events;

    events = App.events;
    events.on('myAccount', function() {
      var eventName;

      eventName = App.userSignnedIn ? 'showProfile' : 'showMembership';
      return events.trigger(eventName);
    });
    events.on('signedIn', function() {
      App.userSignnedIn = true;
      return showInfobar('You are now signed in.');
    });
    events.on('passwordResetRequested', function() {
      var message;

      message = 'An email with a password reset link has been sent to your ' + 'email address. Please open the link to reset your password.';
      return showInfobar(message);
    });
    events.on('signedUp', function() {
      var message;

      message = 'Thank you for signing up, an email with a confirmation link ' + 'has been sent to your email address. Please open the link to ' + 'activate your account.';
      return showInfobar(message);
    });
    events.on('passwordChanged', function() {
      return showInfobar('You have changed your password successfully.');
    });
    return events.on('signedOut', function() {
      App.userSignnedIn = false;
      return showInfobar('You are now signed out.');
    });
  };

  createViews = function() {
    App.membershipView = new App.Views.Membership();
    return App.profileView = new App.Views.Profile();
  };

  App.clientUrl = function() {
    var path, segments;

    segments = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    path = segments.join('/');
    if (path.length && path.indexOf('/') === 0) {
      path = path.substring(1);
    }
    return App.clientUrlPrefix + path;
  };

  App.start = function(options) {
    App.userSignnedIn = options && options.userSignnedIn;
    createViews();
    attachEventHandlers();
    App.router = new App.Router();
    Backbone.history.start();
    if (hasClientUrl()) {
      return true;
    }
    return redirectToDefault();
  };

}).call(this);
