var Application;

(function ($, _, Backbone, Application) {

    function hasClientUrl() {
        var hash = window.location.hash;

        if (hash.length > Application.clientUrlPrefix.length) {
            return true;
        }

        if (Application.clientUrlPrefix.indexOf(hash) === 0) {
            return false;
        }

        return true;
    }

    function redirectToDefault() {
        Application.router.navigate(clientUrl('/'), true);
    }

    function showInfobar(message) {
        _.delay(function () { $.showInfobar(message); }, 400);
    }
    
    function attachEventHandlers() {
        Application.events.on('myAccount', function() {
            var eventName = Application.userSignnedIn ? 'showProfile' : 'showMembership';
            Application.events.trigger(eventName);
        });

        Application.events.on('signedIn', function() {
            Application.userSignnedIn = true;
            showInfobar('You are now signed in.');
        });

        Application.events.on('passwordResetRequested', function() {
            var message = 'An email with a password reset link has been ' +
                'sent to your email address. Please open the link to reset ' +
                'your password.';
            showInfobar(message);
        });

        Application.events.on('signedUp', function() {
            var message = 'Thank you for signing up, an email with a ' +
                'confirmation link has been sent to your email address. ' +
                'Please open the link to activate your account.';
            showInfobar(message);
        });

        Application.events.on('passwordChanged', function() {
            showInfobar('You have changed your password successfully.');
        });

        Application.events.on('signedOut', function() {
            Application.userSignnedIn = false;
            showInfobar('You are now signed out.');
        });
    }
    
    function createViews() {
        Application.membershipView = new Application.Views.Membership();
        Application.profileView = new Application.Views.Profile();
    }
    
    function clientUrl() {
        var path = _.toArray(arguments).join('/');

        if (path.length && path.indexOf('/') === 0) {
            path = path.substring(1);
        }

        return Application.clientUrlPrefix + path;
    }

    function start(options) {
        Application.userSignnedIn = options && options.userSignnedIn;
        
        createViews();
        attachEventHandlers();
        
        Application.router = new Application.Router();
        Backbone.history.start();

        if (!hasClientUrl()) {
            redirectToDefault();
        }
    }

    Application.clientUrl = clientUrl;
    Application.start = start;

})(jQuery, _, Backbone, Application || (Application = {}));