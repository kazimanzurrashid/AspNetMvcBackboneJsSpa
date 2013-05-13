(function ($, _) {
    var timeout = 1000 * 7;
    var animationDuration = 400;

    var template = _.template(
        '<div class="alert alert-{{type}} fade.in flash-bar hide">' +
            '<button type="button" class="close" data-dismiss="alert" title="close">&times;</button>' +
            '<i class="{{icon}}"></i> ' +
            '<span>{{message}}</span>' +
        '</div>');

    function showFlashbar(type, message) {
        type = type.toLowerCase();
        
        var icon;

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
        })).prependTo('body')
            .alert()
            .slideDown(animationDuration);

        _.delay(function() {
            return flashbar.remove();
        }, timeout);
    }

    $.showSuccessbar = function(message) {
        showFlashbar('success', message);
    };

    $.showErrorbar = function(message) {
        showFlashbar('error', message);
    };

    $.showInfobar = function(message) {
        showFlashbar('info', message);
    };

    $(function() {
        var flashbar = $('.flash-bar');
        _.delay(function() {
            var self = flashbar.slideUp(animationDuration, function() {
                return $(self).remove();
            });
        }, timeout);
    });
})(jQuery, _);