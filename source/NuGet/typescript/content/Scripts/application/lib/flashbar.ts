/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/bootstrap/bootstrap.d.ts" />
/// <reference path="../../typings/underscore/underscore-typed.d.ts" />

interface JQueryStatic {
    showSuccessbar(message: string): void;
    showErrorbar(message: string): void;
    showInfobar(message: string): void;
}

(($, _) => {
    var timeout = 1000 * 7;
    var animationDuration = 400;

    var template = _.template(
        '<div class="alert alert-{{type}} fade.in flash-bar hide">' +
            '<button type="button" class="close" data-dismiss="alert" title="close">&times;</button>' +
            '<i class="{{icon}}"></i> ' +
            '<span>{{message}}</span>' +
        '</div>');

    function showFlashbar(type: string, message: string) {
        var icon: string;

        type = type.toLowerCase();

        if (type === 'success') {
            icon = 'icon-ok-sign';
        } else if (type === 'error') {
            icon = 'icon-warning-sign';
        } else if (type === 'info') {
            icon = 'icon-info-sign';
        } else {
            throw new Error('Unknown type.');
        }

        var flashbar = $(template({
                type: type,
                icon: icon,
                message: message
            }))
            .prependTo('body')
            .alert()
            .slideDown(animationDuration);

        _.delay(() => flashbar.remove(), timeout);
    }

    $.showSuccessbar = function (message: string) {
        showFlashbar('success', message);
    };

    $.showErrorbar = function (message: string) {
        showFlashbar('error', message);
    };

    $.showInfobar = function (message: string) {
        showFlashbar('info', message);
    };

    $(() => {
        var flashbar = $('.flash-bar');
        _.delay(() => {
            var self = flashbar.slideUp(animationDuration, () =>
                $(self).remove());
        }, timeout);
    });
})(jQuery, _);