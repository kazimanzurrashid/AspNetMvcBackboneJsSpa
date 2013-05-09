/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/underscore/underscore-typed.d.ts" />

interface IShowFieldErrorsOptions {
    errors?: Object;
    inline?: bool;
}

interface IShowSummaryErrorOptions {
    message?: string;
}

interface JQuery {
    serializeFields(): Object;
    deserializeFields(attributes: Object): JQuery;
    resetFields(): JQuery;
    putFocus(): JQuery;
    hideFieldErrors(): JQuery;
    showFieldErrors(options?: IShowFieldErrorsOptions): JQuery;
    hideSummaryError(): JQuery;
    showSummaryError(options?: IShowSummaryErrorOptions): JQuery;
}

(($, _) => {
    $.fn.serializeFields = function () {
        var fields = {};
        this.each(function {
            $.each($(this).serializeArray(), function {
                fields[this.name] = this.value;
            });
        });
        return fields;
    };

    $.fn.deserializeFields = function (attributes: Object) {
        return this.each(function {
            var self = this;

            _.chain(attributes)
                .keys()
                .each((key: string) =>
                    $(self).find(':input[name="' + key + '"]').val(attributes[key]));
        });
    };

    $.fn.resetFields = function () {
        return this.each(function {
            var container = $(this);
            if (container.is('form')) {
                container.get(0).reset();
                return;
            }
            container.find('form').each(function () { this.reset() });
        });
    };

    $.fn.putFocus = function () {
        var self = this;

        _.delay(() =>
            self.find(':input')
                .not(':button')
                .not(':disabled')
                .first()
                .focus(),
            100);

        return this;
    };

    var animationDuration = 400;
    var timeout = 1000 * 5;

    $.fn.hideFieldErrors = function () {
        return this.each(function () {
            $(this).find('.control-group')
                .filter('.error')
                .removeClass('error')
                .find('.help-block,.help-inline')
                .slideUp(animationDuration, function {
                    $(this).remove();
                });
        });
    };

    $.fn.showFieldErrors = function (options?: IShowFieldErrorsOptions) {
        var opt = <IShowFieldErrorsOptions>$.extend({ inline: false, errors: {} }, options);
        var cssClass = opt.inline ? 'help-inline' : 'help-block';
        var errors = opt.errors || {};
        var firstInput = null;

        this.each(function () {
            $(this).find(':input').each(function () {
                var input = $(this);
                var inputName = input.attr('name');

                if (!inputName) {
                    return;
                }

                var lowerCasedName = inputName.toLocaleLowerCase();

                _.chain(_.keys(errors))
                    .filter((key: string) => errors[key].length)
                    .filter((key: string) => key.toLowerCase() === lowerCasedName)
                    .each((key: string) => {
                        if (!firstInput) {
                            firstInput = input;
                        }
                        input.closest('.control-group').addClass('error');
                        var container = opt.inline ?
                            input.parent() :
                            input.closest('.controls');

                        _.each(errors[key],(message: string) => {
                            $('<span>', { text: message, 'class': cssClass })
                                .appendTo(container)
                                .hide()
                                .slideDown(animationDuration);
                        });
                    });
            });
        });

        if (firstInput) {
            firstInput.focus();
        }

        _.delay(() => $(this).hideFieldErrors(), timeout);

        return this;
    };

    $.fn.hideSummaryError = function () {
        return this.each(function () {
            var container = $(this);
            if (!container.is('form')) {
                container = container.find('form');
            }
            container.find('.alert').slideUp(animationDuration, function () {
                $(this).remove();
            });
        });
    };

    (function () {
        var template = _.template(
            '<div class="alert alert-error fade in">' +
                '<button type="button" class="close" data-dismiss="alert" title="close">&times;</button>' +
                '<strong>Error!</strong> ' +
                '<span>{{message}}</span>' +
            '</div>');

        $.fn.showSummaryError = function (options?: IShowSummaryErrorOptions) {
            var opt = <IShowSummaryErrorOptions>$.extend({
                message: 'An unexpected error has occurred while performing your last operation.'
            }, options);

            return this.each(function {
                var container = $(this);

                if (!container.is('form')) {
                    container = container.find('form');
                }

                $(template({ message: opt.message }))
                    .prependTo(container)
                    .hide()
                    .slideDown(animationDuration);

                _.delay(() => $(this).hideSummaryError(), timeout);
            });
        };
    })();
})(jQuery, _);