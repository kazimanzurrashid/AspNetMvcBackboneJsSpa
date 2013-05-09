/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/underscore/underscore-typed.d.ts" />
/// <reference path="../typings/backbone/backbone.d.ts" />

/// <reference path="lib/flashbar.ts" />
/// <reference path="views/membership.ts" />
/// <reference path="views/profile.ts" />
/// <reference path="events.ts" />
/// <reference path="router.ts" />

module Application {
    export var clientUrlPrefix: string = null;
    export var serverUrlPrefix: string = null;
    export var router: Router = null;
    export var membershipView: Views.Membership = null;
    export var profileView: Views.Profile = null;
    export var userSignnedIn = false;

    function hasClientUrl() {
        var hash = window.location.hash;

        if (hash.length > clientUrlPrefix.length) {
            return true;
        }

        if (clientUrlPrefix.indexOf(hash) === 0) {
            return false;
        }

        return true;
    }

    function redirectToDefault() {
        router.navigate(clientUrl('/'), { trigger: true });
    }

    function showInfobar(message) {
        _.delay(() => $.showInfobar(message), 400);
    }

    function attachEventHandlers() {
        events.on('myAccount', () => {
            var eventName = userSignnedIn ? 'showProfile' : 'showMembership';
            events.trigger(eventName);
        });

        events.on('signedIn', () => {
            userSignnedIn = true;
            showInfobar('You are now signed in.');
        });

        events.on('passwordResetRequested', () => {
            var message = 'An email with a password reset link has been ' +
                'sent to your email address. Please open the link to reset ' +
                'your password.';
            showInfobar(message);
        });

        events.on('signedUp', () => {
            var message = 'Thank you for signing up, an email with a ' +
                'confirmation link has been sent to your email address. ' +
                'Please open the link to activate your account.';
            showInfobar(message);
        });

        events.on('passwordChanged', () =>
            showInfobar('You have changed your password successfully.'));

        events.on('signedOut', () => {
            userSignnedIn = false;
            showInfobar('You are now signed out.');
        });
    }

    function createViews() {
        membershipView = new Views.Membership;
        profileView = new Views.Profile;
    }

    export function clientUrl(...segments: string[]) {
        var path = segments.join('/');
        if (path.length && path.indexOf('/') === 0) {
            path = path.substring(1);
        }
        return clientUrlPrefix + path;
    }

    export function start(options?: { userSignnedIn: bool; }) {
        userSignnedIn = options && options.userSignnedIn;
        createViews();
        attachEventHandlers();
        router = new Router;
        Backbone.history.start();
        if (!hasClientUrl()) {
            redirectToDefault();
        }
    }
}