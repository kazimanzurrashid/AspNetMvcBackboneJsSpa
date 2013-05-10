/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/bootstrap/bootstrap.d.ts" />
/// <reference path="../../typings/underscore/underscore-typed.d.ts" />

interface IConfirmOptions {
    title?: string;
    prompt?: string;
    ok?: () => void;
    cancel?: () => void;
}

interface JQueryStatic {
    confirm(options?: IConfirmOptions): void;
}

(($, _) => {
    var template = _.template(
      '<div class="modal fade hide">' +
        '<div class="modal-header">' +
          '<button type="button" class="close" title="close" data-dismiss="modal">&times;</button>' +
          '<h3>{{title}}</h3>' +
        '</div>' +
        '<div class="modal-body">{{prompt}}</div>' +
        '<div class="modal-footer">' +
          '<button type="button" class="btn">Ok</button>' +
          '<button type="button" class="btn btn-primary" data-dismiss="modal">Cancel</button>' +
        '</div>' +
      '</div>');

    var defaults: IConfirmOptions = {
        title: 'Confirm',
        prompt: 'Are you sure you want to perform this action?',
        ok: () => { },
        cancel: () => { }
    };

    $.confirm = function (options?: IConfirmOptions) {
        var opt = <IConfirmOptions>$.extend(defaults, options);
        var dialog = $(template({ title: opt.title, prompt: opt.prompt }))
          .appendTo('body')
          .modal({ show: false })
          .on('click', '.modal-footer .btn', (e: JQueryEventObject) => {
              if ($(e.currentTarget).is('.btn-primary')) {
                  if (_.isFunction(opt.cancel)) {
                    opt.cancel();
                  }
              } else {
                  dialog.modal('hide');
                  if (_.isFunction(opt.ok)) {
                    opt.ok();
                  }
              }
          })
          .on('hidden', () => dialog.remove())
          .modal('show');
    };
})(jQuery, _);