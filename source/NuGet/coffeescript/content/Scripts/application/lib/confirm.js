(function() {
  var $, defaults, template;

  $ = jQuery;

  template = _("<div class=\"modal fade hide\">\n  <div class=\"modal-header\">\n    <button type=\"button\" class=\"close\" title=\"close\" data-dismiss=\"modal\">&times;</button>\n    <h3>{{title}}</h3>\n  </div>\n  <div class=\"modal-body\">{{prompt}}</div>\n  <div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn\">Ok</button>\n    <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\">Cancel</button>\n  </div>\n</div>").template();

  defaults = {
    title: 'Confirm',
    prompt: 'Are you sure you want to perform this action?',
    ok: function() {},
    cancel: function() {}
  };

  $.confirm = function(options) {
    var data, dialog;
    options = $.extend(defaults, options);
    data = {
      title: options.title,
      prompt: options.prompt
    };
    dialog = $(template(data)).appendTo('body').modal({
      show: false
    });
    dialog.on('click', '.modal-footer .btn', function(e) {
      if ($(e.currentTarget).is('.btn-primary')) {
        return typeof options.cancel === "function" ? options.cancel() : void 0;
      } else {
        dialog.modal('hide');
        return typeof options.ok === "function" ? options.ok() : void 0;
      }
    });
    return dialog.on('hidden', function() {
      return dialog.remove();
    }).modal('show');
  };

}).call(this);
